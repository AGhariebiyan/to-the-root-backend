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
