const { sanitizeEntity } = require('strapi-utils')
const {
  transformUserForArticlePage,
  transformUserForComments,
} = require('../../../extensions/users-permissions/services/sanitize-user')

module.exports = {
  async find(ctx) {
    let articles

    if (ctx.query._q) {
      articles = await strapi.services.article.search(ctx.query)
    } else {
      articles = await strapi.services.article.find(ctx.query)
    }

    return articles.map((article) => {
      if (article.author) {
        article.author = transformUserForArticlePage(article.author)
      }
      return sanitizeEntity(article, { model: strapi.models.article })
    })
  },

  async findOne(ctx) {
    const article = await strapi.services.article.findOne({
      slug: ctx.params.slug,
    })

    let pageview = article.pageview
    console.log("test" + article.category)
    console.log("init: " + pageview)
    if (pageview == null) {
      pageview = 0
      console.log("if " + pageview)
    }

    await strapi.query('article').update({ id: article.id }, {
      pageview: ++pageview
    })

    let articleCategory = await strapi.services.category.findOne({
      slug: article.category.slug
    })

    if (articleCategory.articles.length < 3) {
      // get all articles if category has less than 3 articles
      articles = await strapi.services.article.find()
    }
    else {
      // use the articles belonging to this category
      articles = articleCategory.articles
    }

    //map to sort by views
    let map = new Map();
    for (let i = 0; i < articles.length; i++) {
      let date = new Date(articles[i].original_date)
      let dateDiff = Math.abs(new Date() - date)
      //monthdiff can be 0, so we add 1
      monthDiff = parseInt(dateDiff / (1000 * 60 * 60 * 24 * 30)) + 1
      let weightedDiff = articles[i].pageview / monthDiff
      map.set(articles[i].id, weightedDiff)
    }
    
    // als publicatiedatum ouder is dan 1 jaar moeten die eruit gehaald worden en niet opgeslagen worden in de map.
    // aanmaken recommendation engine calculator functie ()
    // artikelen ophalen van categorie x
    // if (artikelen.length >= 3)
    // functie gebruiken om top 3 artikelen te filteren
    // else ophalen alle artikelen
    // functie gebruiken om top 3 artikelen te filteren

    article.comments = await Promise.all(
      article.comments.map(async (comment) => {
        const user = await strapi
          .query('user', 'users-permissions')
          .findOne({ id: comment.user })
        comment.user = transformUserForComments(user)
        return comment
      }),
    )

    if (article.author) {
      article.author = transformUserForArticlePage(article.author)
    }

    return sanitizeEntity(article, { model: strapi.models.article })
  },

  async comment(ctx) {
    ctx.request.body.article = ctx.params.id
    const entity = await strapi.services.comment.create(ctx.request.body)

    return sanitizeEntity(entity, { model: strapi.models.comment })
  },

  async like(ctx) {
    ctx.request.body.article = ctx.params.id
    const entity = await strapi.services.like.create(ctx.request.body)

    return sanitizeEntity(entity, { model: strapi.models.like })
  },
}
