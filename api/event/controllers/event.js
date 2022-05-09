const { sanitizeEntity } = require('strapi-utils')
const {
  transformUserForEventPage,
} = require('../../../extensions/users-permissions/services/sanitize-user')

module.exports = {
  async find(ctx) {
    let events

    if (ctx.query._q) {
      events = await strapi.services.event.search(ctx.query)
    } else {
      events = await strapi.services.event.find(ctx.query)
    }

    return events.map((event) => {
      if (event.speakers) {
        event.speakers = event.speakers.map((speaker) =>
          transformUserForEventPage(speaker),
        )
      }
      return sanitizeEntity(event, { model: strapi.models.event })
    })
  },

  async findOne(ctx) {
    const entity = await strapi.services.event.findOne({ id: ctx.params.id })

    if (entity.speakers) {
      entity.speakers = entity.speakers.map((speaker) =>
        transformUserForEventPage(speaker),
      )
    }

    return sanitizeEntity(entity, { model: strapi.models.event })
  },
}
