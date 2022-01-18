'use strict'

require('dotenv').config()
const algoliasearch = require('algoliasearch')
const axios = require('axios')

const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY
const searchClient = algoliasearch(appId, adminKey)
const index = searchClient.initIndex(process.env.ALGOLIA_INDEX)

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        afterCreate: async (entry) => {
            console.log('afterCreate');
        },
        afterUpdate: async (entry) => {
            console.log('afterUpdate');
            setArticleInAlgolia(entry);
        },
        afterDestroy: async (entry) => {
            console.log('afterDestroy');
        },
    }
}

async function setArticleInAlgolia(entry) {
    const article = { ...entry, objectID: entry.id }
    delete article['comments'];
    delete article['likes'];

    index.saveObjects([article]).catch((error) => console.log(error));
}
