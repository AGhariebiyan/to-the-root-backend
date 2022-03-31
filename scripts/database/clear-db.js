require('dotenv').config('../../.env')

const axios = require('axios')

async function getArticleIds() {
  let articles = []
  try {
    const response = await axios.get(`${process.env.URL}/articles`)
    articles = await response.data
  } catch (err) {
    console.log(
      `${
        err.toJSON().message
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
      `${
        err.toJSON().message
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
      `${
        err.toJSON().message
      } \n Getting tags went wrong! See error above or the logging of the strapi server`,
    )
  }
  return tags.map((tag) => tag.id)
}

async function getUserIds() {
  let users = []
  try {
    const response = await axios.get(`${process.env.URL}/users`)
    users = await response.data
  } catch (err) {
    console.log(
      `${
        err.toJSON().message
      } \n Getting users went wrong! See error above or the logging of the strapi server`,
    )
  }
  return users.map((user) => user.id)
}

async function getFeaturedIds() {
  let featureds = []
  try {
    const response = await axios.get(`${process.env.URL}/featureds`)
    featureds = await response.data
  } catch (err) {
    console.log(
      `${
        err.toJSON().message
      } \n Getting featureds went wrong! See error above or the logging of the strapi server`,
    )
  }
  return featureds.map((featured) => featured.id)
}

async function clearDB() {
  const articleIds = await getArticleIds()
  const userIds = await getUserIds()
  const categoryIds = await getCategoryIds()
  const tagIds = await getTagIds()
  const featuredIds = await getFeaturedIds()

  for (const id of userIds) {
    try {
      axios.delete(`${process.env.URL}/users/${id}`)
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
