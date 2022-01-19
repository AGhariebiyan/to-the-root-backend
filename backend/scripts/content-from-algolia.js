require('dotenv').config({
  path: '../.env',
})
const algoliasearch = require('algoliasearch')
const axios = require('axios')

const appId = process.env.ALGOLIA_APP_ID
const searchKey = process.env.ALGOLIA_SEARCH_KEY
const searchClient = algoliasearch(appId, searchKey)
const index = searchClient.initIndex(process.env.ALGOLIA_INDEX)

async function getStrapiArticleIds() {
  try {
    const response = await axios.get(`${process.env.URL}/articles`)

    return response.data.map((article) => article.id)
  } catch (err) {
    console.log('Something went wrong getting the article ids: ', err)
  }
}

async function deleteStrapiArticles() {
  const articleIds = await getStrapiArticleIds()

  for (const id of articleIds) {
    axios.delete(`${process.env.URL}/articles/${id}`)
  }
}

async function putAlgoliaContentInStrapi() {
  const articles = await index.search('*').then((result) => {
    return result.hits
  })

  for (const article of articles) {
    axios.post(`${process.env.URL}/articles`, article)
  }
}

async function clearAndFillStrapi() {
  await deleteStrapiArticles()
  await putAlgoliaContentInStrapi()
}

clearAndFillStrapi()
