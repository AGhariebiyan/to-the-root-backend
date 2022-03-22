require('dotenv').config('../../.env')

const axios = require('axios')

async function getArticleIds() {
  let articles = []
  try {
    const response = await axios.get(`${process.env.URL}/articles`)
    articles = await response.data
  } catch (err) {
    console.log(
      `${err.toJSON().message
      } \n Getting articles went wrong! See error above or the logging of the strapi server`,
    )
  }
  return articles.map((article) => article.id)
}
async function getCategoryIds() {
  let categories = []
  try {
    const response = await axios.get(`${process.env.URL}/categories`)
    categories = await response.data
  } catch (err) {
    console.log(
      `${err.toJSON().message
      } \n Getting categories went wrong! See error above or the logging of the strapi server`,
    )
  }
  return categories.map((category) => category.id)
}
async function getTagIds() {
  let tags = []
  try {
    const response = await axios.get(`${process.env.URL}/tags`)
    tags = await response.data
  } catch (err) {
    console.log(
      `${err.toJSON().message
      } \n Getting tags went wrong! See error above or the logging of the strapi server`,
    )
  }
  return tags.map((tag) => tag.id)
}

async function getAuthorIds() {
  let authors = []
  try {
    const response = await axios.get(`${process.env.URL}/authors`)
    authors = await response.data
  } catch (err) {
    console.log(
      `${err.toJSON().message
      } \n Getting authors went wrong! See error above or the logging of the strapi server`,
    )
  }
  return authors.map((author) => author.id)
}

async function getFeaturedIds() {
  let featureds = []
  try {
    const response = await axios.get(`${process.env.URL}/featureds`)
    featureds = await response.data
  } catch (err) {
    console.log(
      `${err.toJSON().message
      } \n Getting featureds went wrong! See error above or the logging of the strapi server`,
    )
  }
  return featureds.map((featured) => featured.id)
}

async function clearDB() {
  const articleIds = await getArticleIds()
  const authorIds = await getAuthorIds()
  const categoryIds = await getCategoryIds()
  const tagIds = await getTagIds()
  const featuredIds = await getFeaturedIds()

  for (const id of authorIds) {
    try {
      axios.delete(`${process.env.URL}/authors/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  for (const id of categoryIds) {
    try {
      axios.delete(`${process.env.URL}/categories/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  for (const id of tagIds) {
    try {
      axios.delete(`${process.env.URL}/tags/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  for (const id of articleIds) {
    try {
      axios.delete(`${process.env.URL}/articles/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  for (const id of featuredIds) {
    try {
      axios.delete(`${process.env.URL}/featureds/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

clearDB()
