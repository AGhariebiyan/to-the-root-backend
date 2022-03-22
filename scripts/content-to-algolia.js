require('dotenv').config()
const algoliasearch = require('algoliasearch')
const axios = require('axios')

const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY
const searchClient = algoliasearch(appId, adminKey)
const index = searchClient.initIndex(process.env.ALGOLIA_INDEX)

// See the root folder's README for how to use this script

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

setArticlesInAlgolia()
