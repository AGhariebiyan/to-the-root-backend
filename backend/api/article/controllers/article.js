const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async comment(ctx) {
        ctx.request.body.article = ctx.params.id;
        const entity = await strapi.services.comment.create(ctx.request.body);

        return sanitizeEntity(entity, { model: strapi.models.comment });
    },
    async like(ctx) {
        ctx.request.body.article = ctx.params.id;
        const entity = await strapi.services.like.create(ctx.request.body);

        return sanitizeEntity(entity, { model: strapi.models.like });
    },
}
