require('dotenv').config('../../.env')

const axios = require('axios')

const authors = [
  {
    name: 'Menno Wielhouwer',
    email: 'menno.wielhouwer@ordina.nl',
  },
  {
    name: 'Barack Obama',
    email: 'barackobama@pdotus.com',
  },
]

const categories = [
  {
    name: 'vue-js',
    slug: 'vue-js',
  },
  {
    name: 'angular',
    slug: 'angular',
  },
  {
    name: 'java',
    slug: 'java',
  },
  {
    name: 'laravel',
    slug: 'laravel',
  },
]

const articles = [
  {
    title: '10 Best tech gadgets you need in your life',
    content:
      '<p>Your life is about to get a little simpler and more fulfilling with our list of the top 10 best gadgets for daily use. Because sometimes we need a helping hand or a nudge in the right direction to make healthier choices. If you’re reaching to tech for guidance, you’re in the right place with today’s Daily Digest. Enhance your leisure time, get more creative at work, feel safer indoors, and more with our list of the best tech gadgets for everyday use.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul><li>We crafted a list of some must-have tech that you can easily incorporate into your daily routine. Want to stand up straighter? There’s a gadget for that. Planning on upping your fitness regime? We have the equipment for that. There’s so much more to discover in today’s article, too. Related:&nbsp;</li><li>&nbsp;</li><li>The best air purifiers of 2021 for your home We included a smart breath training system that assesses your breathing health and provides exercises to increase your lung capacity. We also included a smart robot vacuum that learns your cleaning habits and features voice assistants. Explore all of our recommended tech in the list below. 1. The Nintendo Switch OLED model features a vibrant 7-inch OLED screen and 64 GB of internal storage for fun gameplay.[text](link) 2. 3. 4. js ```console.log(\'test\');``` !<a href="test.com">[Rainbow@ordina.</a>png](</li></ul><p>&nbsp;</p><blockquote><p>/uploads/Rainbow_ordina_f934941d36.png) The Nintendo Switch OLED model provides three modes for play: TV, Handheld, and Tabletop. You can conveniently switch between these modes based on your needs.&nbsp;</p></blockquote><p>Best of all, the adjustable stand makes Tabletop mode ideal for multiplayer gaming. Or the built-in wired LAN port is great for using in the TV mode gaming. This item is available for order on October 8 for $349.99. 2. Take your well-being to new heights with the Airofit PRO smart breath training system. See improvements in your lung capacity in just a couple of weeks with 5–10 minutes of use daily. Designed in the form of a tiny gadget, you can take the Airofit PRO smart breath training system everywhere you go. It comes with an app that analyzes your lung capacity, anaerobic threshold, respiratory strength, and other areas of your breathing. You’ll then receive all of this data to your phone, where you can make improvements.</p>',
    original_date: '2021-07-23',
    slug: '10-best-tech-gadgets-you-need-in-your-life',
    description: 'A short article about anything',
  },
  {
    title: 'Apps I can’t live without (v2021)',
    content:
      '<p>With this post, my wish is to highlight some of the great apps I use in my daily life. Let me start by giving you some context that may help understand my choices a bit better. Personally, I’m a tech geek and an Apple fanboy, so I’ll be mostly talking about apps in the Apple ecosystem. Professionally I’ve been working in web development for the last 20 years, started as a developer, and now I lead tech and product teams. Currently, I’m CTO at sheerME. Let’s dive into the apps, starting with my Macbook Pro. I’m working in a 13-inch core i5 from 2016 with 16GB of ram (eagerly awaiting the arrival of my M1 Macbook Pro). The browser of choice: Google Chrome Two reasons why I prefer chrome, the devtools, and the extension ecosystem. These are the extensions I currently use: Metamask: A crypto wallet (I’m big into Ethereum)&nbsp;</p><p>&nbsp;</p><p>Defi Saver Gas Price extension: Also for the Ethereum ecosystem, it keeps me informed of gas prices (used to pay for transactions inside the network) Ghostery: My preferred ad blocker Raindrop.io: A very well done bookmark manager where I store bookmarks for future reference but also where I drop articles I want to read later. raindrop.io bookmark manager Mail Client: Superhuman It’s a bit on the expensive side but it helps me deal with email a lot faster than all the other clients I tried so for someone that spends a big chunk of his day on email, it’s well worth it. I’m very tempted to try hey.com from the basecamp guys but I can’t switch to a hey.com email address so for now I’ll stick with Superhuman. Calendar App: Fantastical Fantastical is all about the little details… the way you can identify a zoom, hangout, skype call or any other just by looking at the event in the calendar, the small icon that tells you how the weather is for the day, the natural language parser that enables you to create events just by typing what you want…&nbsp;</p><p>&nbsp;</p><blockquote><p>This is a quote</p></blockquote><p>&nbsp;</p><p>Fantastical Music Player: Spotif…Apple Music Being so entrenched in the Apple ecosystem it is very hard not to go with apple music, as much as I love Spotify, particularly the dynamic playlists that allow me to discover new music every day, Apple music just works so well across all my apple setup that I couldn’t resist. Note-taking: Roam Research As a very visual person I’m naturally drawn to apps like Bear notes or Craft but after a couple of tries, I’m now convinced that Rom is the best note-taking app for me. The main reason is that it solves my biggest problem with notes in general, the resurfacing of relevant content when needed. Before Roam, most of my notes would quickly fall by the wayside. With Roam, they just pop up when needed.</p>',
    original_date: '2021-08-20',
    slug: 'apps-i-can-t-live-without-v2021',
    description: 'The best apps to own right now',
  },
  {
    title: 'More apps I can’t live without (v2021)',
    content:
      '<p>With this post, my wish is to highlight some of the great apps I use in my daily life. Let me start by giving you some context that may help understand my choices a bit better. Personally, I’m a tech geek and an Apple fanboy, so I’ll be mostly talking about apps in the Apple ecosystem. Professionally I’ve been working in web development for the last 20 years, started as a developer, and now I lead tech and product teams. Currently, I’m CTO at sheerME. Let’s dive into the apps, starting with my Macbook Pro. I’m working in a 13-inch core i5 from 2016 with 16GB of ram (eagerly awaiting the arrival of my M1 Macbook Pro). The browser of choice: Google Chrome Two reasons why I prefer chrome, the devtools, and the extension ecosystem. These are the extensions I currently use: Metamask: A crypto wallet (I’m big into Ethereum)&nbsp;</p><p>&nbsp;</p><p>Defi Saver Gas Price extension: Also for the Ethereum ecosystem, it keeps me informed of gas prices (used to pay for transactions inside the network) Ghostery: My preferred ad blocker Raindrop.io: A very well done bookmark manager where I store bookmarks for future reference but also where I drop articles I want to read later. raindrop.io bookmark manager Mail Client: Superhuman It’s a bit on the expensive side but it helps me deal with email a lot faster than all the other clients I tried so for someone that spends a big chunk of his day on email, it’s well worth it. I’m very tempted to try hey.com from the basecamp guys but I can’t switch to a hey.com email address so for now I’ll stick with Superhuman. Calendar App: Fantastical Fantastical is all about the little details… the way you can identify a zoom, hangout, skype call or any other just by looking at the event in the calendar, the small icon that tells you how the weather is for the day, the natural language parser that enables you to create events just by typing what you want…&nbsp;</p><p>&nbsp;</p><blockquote><p>This is a quote</p></blockquote><p>&nbsp;</p><p>Fantastical Music Player: Spotif…Apple Music Being so entrenched in the Apple ecosystem it is very hard not to go with apple music, as much as I love Spotify, particularly the dynamic playlists that allow me to discover new music every day, Apple music just works so well across all my apple setup that I couldn’t resist. Note-taking: Roam Research As a very visual person I’m naturally drawn to apps like Bear notes or Craft but after a couple of tries, I’m now convinced that Rom is the best note-taking app for me. The main reason is that it solves my biggest problem with notes in general, the resurfacing of relevant content when needed. Before Roam, most of my notes would quickly fall by the wayside. With Roam, they just pop up when needed.</p>',
    original_date: '2021-08-20',
    slug: 'apps-i-can-t-live-without-v2022',
    description: 'The best apps to own right now',
  },
]

// Make sure you have the right permissions:
// In Strapi > Settings > User & permissions > roles > public, tick the create permissions for all entities.
// Generating and uploading images does not work for now. I did not find how to fill the Media Library through API.

async function seedDb() {
  let articles = await getArticles()

  if (articles.length > 0) {
    return
  }
  // We can expect an empty database here

  const authorIds = await seedAuthors()
  const categoryIds = await seedCategories()
  await seedArticles(authorIds, categoryIds)
}

async function getArticles() {
  let articles = []
  try {
    const response = await axios.get(`${process.env.URL}/articles`)
    articles = await response.data
  } catch (err) {
    console.log(
      err.data,
      'Getting articles went wrong! See error above or the logging of the strapi server',
    )
  }
  return articles
}

async function seedAuthors() {
  const authorIds = []
  for (const author of authors)
    try {
      const response = await axios.post(`${process.env.URL}/authors`, author)
      authorIds.push(response.data.id)
    } catch (err) {
      console.log(
        err.data,
        'Setting authors went wrong! See error above or the logging of the strapi server',
      )
    }
  console.log(`${authorIds.length} authors set`)
  return authorIds
}

async function seedCategories() {
  const categoryIds = []
  for (const category of categories)
    try {
      const response = await axios.post(
        `${process.env.URL}/categories`,
        category,
      )
      categoryIds.push(response.data.id)
    } catch (err) {
      console.log(
        `${err.toJSON().message}
        Setting categories went wrong! See error above or the logging of the strapi server`,
      )
    }
  console.log(`${categoryIds.length} categories set`)
  return categoryIds
}

async function seedArticles(authorIds, categoryIds) {
  for (let [index, article] of articles.entries())
    try {
      article = {
        ...article,
        author: {
          id: getNextItemFrom(authorIds, index),
        },
        categories: [
          {
            id: getNextItemFrom(categoryIds, index),
          },
        ],
      }
      await axios.post(`${process.env.URL}/articles`, article)
    } catch (err) {
      console.log(
        err.data,
        'Setting articles went wrong! See error above or the logging of the strapi server',
      )
    }
  console.log(`${articles.length} articles set`)
}

function getNextItemFrom(array, index) {
  return array[index % array.length]
}

seedDb()
