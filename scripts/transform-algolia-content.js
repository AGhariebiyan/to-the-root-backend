// Note how this script only transfers Articles, not other entities like Authors, Comments etc.
// This script is for testing and development purposes only

require('dotenv').config()

const algoliasearch = require('algoliasearch')

const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY
const searchClient = algoliasearch(appId, adminKey)
const index = searchClient.initIndex(process.env.ALGOLIA_INDEX)

async function transformArticlesForAlgolia() {
    const articles = await index.search('*').then((result) => {
        return result.hits
    })

    const transformedArticles = articles.map((article) => {
        return transformArticleForAlgolia(article)
    })

    index.saveObjects(transformedArticles, {
        autoGenerateObjectIDIfNotExist: true,
    })
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

transformArticlesForAlgolia()
