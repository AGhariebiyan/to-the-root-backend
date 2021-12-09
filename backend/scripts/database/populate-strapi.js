require('dotenv').config()
const axios = require('axios')

// Make sure you have the right permissions:
// In Strapi > Settings > User & permissions > roles > public, tick the create permissions for all entities.

// Make sure you copy the images from the images folder and paste them in the backend/public/uploads folder. Create the folder if you haven't yet.

import { authors } from './authors'
import { categories } from './categories'
import { articles } from './articles'

async function uploadArticles() {
  for (const article in articles) {
    await axios.post(`${process.env.URL}/articles`, article)
  }
}
async function uploadAuthors() {
  for (const author in authors) {
    await axios.post(`${process.env.URL}/authors`, author)
  }
}
async function uploadCategories() {
  for (const category in categories) {
    await axios.post(`${process.env.URL}/categories`, category)
  }
}

async function uploadAll() {
  try {
    await uploadAuthors()
  } catch (err) {
    console.log('authors')
  }
  try {
    await uploadCategories()
  } catch (err) {
    console.log('categories')
  }
  try {
    await uploadArticles()
  } catch (err) {
    console.log('articles')
  }
}

uploadAll()
