'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    find(params, populate) {
        return strapi.query('featured').find(params, ["article", "article.cover_image", "article.author"]);
    },
};
