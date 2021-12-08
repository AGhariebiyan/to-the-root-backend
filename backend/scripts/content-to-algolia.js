require('dotenv').config()
const algoliasearch = require('algoliasearch')
const axios = require('axios')

const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY
const searchClient = algoliasearch(appId, adminKey)
const index = searchClient.initIndex(process.env.ALGOLIA_INDEX)

// How to make this work:
// 1. Create an account on Algolia (or use the main totherootdev Google account found in Project Pages on Jira) and (a personal) index on Algolia.
// 2. Then: adapt .env accordingly with ENVIRONMENT=production and the appropriate Algolia variables from env.example.
// 3. Use the APP_ID from env.example for the totherootdev account, or use your own. As index, create your own. I used `content_${myName}`.
// 4. Run the script with "npm run content-to-algolia"
// 5. Make sure to follow the steps in Algolia to setup the index, INCLUDING setting up searchable attributes.
// 6. I went with "content", "description", "author.name", "categories.name" for searchable attributes. But you can pick whatever you like for now.
// 7. Adapt the frontend algolia search key
// 7. It should work! Any questions can be directed to Joran

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
