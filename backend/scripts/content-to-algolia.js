require('dotenv').config()
const algoliasearch = require('algoliasearch')
const axios = require('axios')

const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY
const searchClient = algoliasearch(appId, adminKey)
const index = searchClient.initIndex(process.env.ALGOLIA_INDEX)

// How to make this work:
// 1. Create an account on Algolia (or use the 1337 Google account found in Project Pages on Jira) and (a personal) index on Algolia.
// 2. Then: adapt .env accordingly with ENVIRONMENT=production and the appropriate Algolia variables.
// 3. Make sure the backend is running somewhere else than localhost. Use ngrok for instance

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
