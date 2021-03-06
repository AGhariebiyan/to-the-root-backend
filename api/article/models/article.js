'use strict'

require('dotenv').config()
const algoliasearch = require('algoliasearch')

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
        afterUpdate: async (entry) => {
            if (entry.published_at != null) {
                setArticleInAlgolia(entry);
            } else {
                deleteArticleInAlgolia(entry)
            }
        },
        afterDelete: async (entry) => {
            deleteArticleInAlgolia(entry)
        },
    }
}

async function setArticleInAlgolia(entry) {
    const article = transformArticleForAlgolia(entry)
    index.saveObjects([article]).catch((error) => console.log(error));
}

async function deleteArticleInAlgolia(entry) {
    index.deleteObjects([entry.id]).catch((error) => console.log(error));
}

function transformArticleForAlgolia(entry) {
    return {
        author: {
            name: entry.author.name,
            username: entry.author.username,
        },
        category: {
            name: entry.category.name,
        },
        content: removeHTMLTags(entry.content),
        cover_image: entry.cover_image,
        description: entry.description,
        objectID: entry.id,
        original_date: entry.original_date,
        published_at: entry.published_at,
        slug: entry.slug,
        tags: [...entry.tags.map(tag => ({ name: tag.name }))],
        title: entry.title,
    }
}

function removeHTMLTags(htmlString) {
    // Regex to remove HTML tags:
    // Example: "<p>Hello World!</p>"" --> "Hello World"
    const htmlToPlainTextRegExp = /<[^>]*>/g

    return htmlString.replace(
        htmlToPlainTextRegExp,
        '',
    )
}
