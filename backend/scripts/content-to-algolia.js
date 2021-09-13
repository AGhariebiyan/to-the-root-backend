require('dotenv').config()
const algoliasearch = require('algoliasearch')
const axios = require('axios')

const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY
const searchClient = algoliasearch(appId, adminKey)
const index = searchClient.initIndex(process.env.ALGOLIA_INDEX)

// How to make this work:
// 1. Create an account on Algolia (or use the main Google account found in Project Pages on Jira) and (a personal) index on Algolia.
// 2. Make sure to follow the steps in Algolia to setup the index, INCLUDING setting up searchable attributes.
// 3. I went with "content", "description", "author.name", "categories.name" for searchable attributes. But you can pick whatever you like for now.
// 4. Then: adapt .env accordingly with ENVIRONMENT=production and the appropriate Algolia variables from env.example.
// 5. Run the script with "npm run content-to-algolia"

async function setArticlesInAlgolia() {
  try {
    const response = await axios.get(`${process.env.URL}/articles`)

    const articles = response.data

    const articlesWithObjectID = articles.map((article) => {
      return { ...article, objectID: article.id }
    })
    index.saveObjects(articlesWithObjectID, {
      autoGenerateObjectIDIfNotExist: true,
    })
  } catch (err) {
    console.log(err)
  }
}

if (process.env.ENVIRONMENT === 'production') {
  setArticlesInAlgolia()
}
