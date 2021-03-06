'use strict'

const { sanitizeEntity } = require('strapi-utils/lib')
const {
  transformUserForArticlePage,
} = require('../../../extensions/users-permissions/services/sanitize-user')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let featureds

    if (ctx.query._q) {
      featureds = await strapi.services.featured.search(ctx.query)
    } else {
      featureds = await strapi.services.featured.find(ctx.query)
    }

    return featureds.map((featured) => {
      if (featured.article.author) {
        featured.article.author = transformUserForArticlePage(
          featured.article.author,
        )
      }
      return sanitizeEntity(featured, { model: strapi.models.article })
    })
  },
}
