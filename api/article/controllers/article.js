const { sanitizeEntity } = require('strapi-utils')
const {
  transformUserForArticlePage,
  transformUserForComments,
} = require('../../../extensions/users-permissions/services/sanitize-user')

function filterOneYear(article) {
  const oneYear = 365 * 24 * 60 * 60 * 1000;

  let articleDate = new Date(article.original_date);
  let dateNow = new Date();

  return dateNow - articleDate <= oneYear;
}

function deleteRedundancy(articles) {
  let filteredArticles = new Set(articles)
  return Array.from(filteredArticles)
}

// Calculate and sort by scores
function sortByScore(articles) {
  articles.map(article => {
    let articleDate = new Date(article.original_date).getTime;
    let dateNow = new Date().getTime();
    let timeAgoUnix = dateNow - articleDate;
    let pageView = article.pageView || 1;

    let score = timeAgoUnix / pageView;

    article.score = score;
  })
  return articles.sort((a, b) => a.score - b.score);
}

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
    if (pageview == null) {
      pageview = 0
    }

    await strapi.query('article').update({ id: article.id }, {
      pageview: ++pageview
    })

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

  async getRecommendedArticles(ctx) {
    const article = await strapi.services.article.findOne({
      slug: ctx.params.slug,
    })

    let categoryArticles = await strapi.services.article.find({
      category: article.category.id
    })

    categoryArticles = categoryArticles.filter(filterOneYear)

    if (categoryArticles.length < 4) {
      // get all articles if category has less than 3 articles
      let allArticles = await strapi.services.article.find()
      allArticles = allArticles.filter(filterOneYear)
      
      categoryArticles = sortByScore(categoryArticles)
      allArticles = sortByScore(allArticles)
      articles = categoryArticles.concat(allArticles)
    } else {
      categoryArticles = sortByScore(categoryArticles)
      articles = categoryArticles
    }

    // articles = deleteRedundancy(articles)
    const index = articles.findIndex( currentArticle => {
      return currentArticle.slug === article.slug
    })

    articles.splice(index, 1)

    // Return 3 recommendations
    return articles.slice(0, 3).map((article) => {
      if (article.author) {
        article.author = transformUserForArticlePage(article.author)
      }
      return sanitizeEntity(article, { model: strapi.models.article })
    })
  }
}
