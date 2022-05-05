const { sanitizeEntity } = require('strapi-utils');
const { transformUserForEventPage } = require('../../../extensions/users-permissions/services/sanitize-user');

module.exports = {
    async find() {
        const entities = await strapi.services.event.find();

        return entities.map(entity => {
            if (entity.speakers) {
                entity.speakers = entity.speakers.map(speaker => transformUserForEventPage(speaker))
            }
            return sanitizeEntity(entity, { model: strapi.models.event });
        })
    },

    async findOne(ctx) {
        const entity = await strapi.services.event.findOne({ id: ctx.params.id });

        if (entity.speakers) {
            entity.speakers = entity.speakers.map(speaker => transformUserForEventPage(speaker))
        }

        return sanitizeEntity(entity, { model: strapi.models.event });
    },
};
