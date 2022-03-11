require('dotenv').config('../../.env')

const axios = require('axios')
const request = require('request')
const fs = require('fs')
const fsPromises = require('fs/promises')
const FormData = require('form-data')
const { type } = require('os')

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
    name: 'Frontend',
    slug: 'frontend',
  },
  {
    name: 'Backend',
    slug: 'backend',
  },
  {
    name: 'Security',
    slug: 'security',
  },
  {
    name: 'Hardware',
    slug: 'hardware',
  },
  {
    name: 'Design',
    slug: 'deign',
  },
  {
    name: 'Business Development',
    slug: 'business-development',
  },
  {
    name: 'AI/ML',
    slug: 'ai-ml',
  },
  {
    name: 'DevOps',
    slug: 'dev-ops',
  },
  {
    name: 'Data Engineering',
    slug: 'data-engineering',
  },
  {
    name: 'Cloud',
    slug: 'cloud',
  },
  {
    name: 'Agile',
    slug: 'agile',
  },
]

const tags = [
  {
    name: 'Vue.js',
    slug: 'vue-js',
  },
  {
    name: 'Angular',
    slug: 'angular',
  },
  {
    name: 'Java',
    slug: 'java',
  },
  {
    name: 'Laravel',
    slug: 'laravel',
  },
]

const IMAGES_PATH = '../seed_images'

const images = [
  {
    name: 'tech-gadgets',
    url: 'https://images.unsplash.com/photo-1519335553051-96f1218cd5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2440&q=80',
  },
  {
    name: '3d-app-blocks',
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  },
  {
    name: 'netflix-office',
    url: 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2086&q=80',
  },
  {
    name: 'laptop-with-code',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'app-store',
    url: 'https://images.unsplash.com/photo-1601034913836-a1f43e143611?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  },
  {
    name: 'apple-tv',
    url: 'https://images.unsplash.com/photo-1621685950846-9323d993bbf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'developer-in-front-of-screens',
    url: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
]

const articles = [
  {
    title: '10 Best tech gadgets you need in your life',
    content:
      '<p>Your life is about to get a little simpler and more fulfilling with our list of the top 10 best gadgets for daily use. Because sometimes we need a helping hand or a nudge in the right direction to make healthier choices. If you’re reaching to tech for guidance, you’re in the right place with today’s Daily Digest. Enhance your leisure time, get more creative at work, feel safer indoors, and more with our list of the best tech gadgets for everyday use.</p><ul><li>We crafted a list of some must-have tech that you can easily incorporate into your daily routine. Want to stand up straighter? There’s a gadget for that. Planning on upping your fitness regime? We have the equipment for that. There’s so much more to discover in today’s article, too.</li><li>The best air purifiers of 2021 for your home We included a smart breath training system that assesses your breathing health and provides exercises to increase your lung capacity. We also included a smart robot vacuum that learns your cleaning habits and features voice assistants. Explore all of our recommended tech in the list below.</li></ul><blockquote>The #1 gadget is the MacBook Pro 2021</blockquote><p>Best of all, the adjustable stand makes Tabletop mode ideal for multiplayer gaming. Or the built-in wired LAN port is great for using in the TV mode gaming. This item is available for order on October 8 for $349.99. 2. Take your well-being to new heights with the Airofit PRO smart breath training system. See improvements in your lung capacity in just a couple of weeks with 5–10 minutes of use daily. Designed in the form of a tiny gadget, you can take the Airofit PRO smart breath training system everywhere you go. It comes with an app that analyzes your lung capacity, anaerobic threshold, respiratory strength, and other areas of your breathing. You’ll then receive all of this data to your phone, where you can make improvements.</p>',
    original_date: '2021-07-23',
    slug: '10-best-tech-gadgets-you-need-in-your-life',
    description: 'The ones I use day to day',
  },
  {
    title: 'Apps I can’t live without (v2021)',
    content:
      '<p>With this post, my wish is to highlight some of the great apps I use in my daily life. Let me start by giving you some context that may help understand my choices a bit better. Personally, I’m a tech geek and an Apple fanboy, so I’ll be mostly talking about apps in the Apple ecosystem. Professionally I’ve been working in web development for the last 20 years, started as a developer, and now I lead tech and product teams. Currently, I’m CTO at sheerME. Let’s dive into the apps, starting with my Macbook Pro. I’m working in a 13-inch core i5 from 2016 with 16GB of ram (eagerly awaiting the arrival of my M1 Macbook Pro). The browser of choice: Google Chrome Two reasons why I prefer chrome, the devtools, and the extension ecosystem. These are the extensions I currently use: Metamask: A crypto wallet (I’m big into Ethereum).</p><p>Defi Saver Gas Price extension: Also for the Ethereum ecosystem, it keeps me informed of gas prices (used to pay for transactions inside the network) Ghostery: My preferred ad blocker Raindrop.io: A very well done bookmark manager where I store bookmarks for future reference but also where I drop articles I want to read later. raindrop.io bookmark manager Mail Client: Superhuman It’s a bit on the expensive side but it helps me deal with email a lot faster than all the other clients I tried so for someone that spends a big chunk of his day on email, it’s well worth it. I’m very tempted to try hey.com from the basecamp guys but I can’t switch to a hey.com email address so for now I’ll stick with Superhuman. Calendar App: Fantastical Fantastical is all about the little details… the way you can identify a zoom, hangout, skype call or any other just by looking at the event in the calendar, the small icon that tells you how the weather is for the day, the natural language parser that enables you to create events just by typing what you want…</p><blockquote><p>This is an awesome quote</p></blockquote><p>Fantastical Music Player: Spotif…Apple Music Being so entrenched in the Apple ecosystem it is very hard not to go with apple music, as much as I love Spotify, particularly the dynamic playlists that allow me to discover new music every day, Apple music just works so well across all my apple setup that I couldn’t resist. Note-taking: Roam Research As a very visual person I’m naturally drawn to apps like Bear notes or Craft but after a couple of tries, I’m now convinced that Rom is the best note-taking app for me. The main reason is that it solves my biggest problem with notes in general, the resurfacing of relevant content when needed. Before Roam, most of my notes would quickly fall by the wayside. With Roam, they just pop up when needed.</p>',
    original_date: '2021-08-20',
    slug: 'apps-i-can-t-live-without-v2021',
    description: 'The best apps to own right now',
  },
  {
    title: 'Netflix vs Prime Video: Streaming quality comparison',
    content:
      '<p>With this post, my wish is to highlight some of the great apps I use in my daily life. Let me start by giving you some context that may help understand my choices a bit better. Personally, I’m a tech geek and an Apple fanboy, so I’ll be mostly talking about apps in the Apple ecosystem. Professionally I’ve been working in web development for the last 20 years, started as a developer, and now I lead tech and product teams. Currently, I’m CTO at sheerME. Let’s dive into the apps, starting with my Macbook Pro. I’m working in a 13-inch core i5 from 2016 with 16GB of ram (eagerly awaiting the arrival of my M1 Macbook Pro). The browser of choice: Google Chrome Two reasons why I prefer chrome, the devtools, and the extension ecosystem. These are the extensions I currently use: Metamask: A crypto wallet (I’m big into Ethereum)&nbsp;</p><p>Defi Saver Gas Price extension: Also for the Ethereum ecosystem, it keeps me informed of gas prices (used to pay for transactions inside the network) Ghostery: My preferred ad blocker Raindrop.io: A very well done bookmark manager where I store bookmarks for future reference but also where I drop articles I want to read later. raindrop.io bookmark manager Mail Client: Superhuman It’s a bit on the expensive side but it helps me deal with email a lot faster than all the other clients I tried so for someone that spends a big chunk of his day on email, it’s well worth it. I’m very tempted to try hey.com from the basecamp guys but I can’t switch to a hey.com email address so for now I’ll stick with Superhuman. Calendar App: Fantastical Fantastical is all about the little details… the way you can identify a zoom, hangout, skype call or any other just by looking at the event in the calendar, the small icon that tells you how the weather is for the day, the natural language parser that enables you to create events just by typing what you want…&nbsp;</p><blockquote><p>4K HDR</p></blockquote><p>Fantastical Music Player: Spotif…Apple Music Being so entrenched in the Apple ecosystem it is very hard not to go with apple music, as much as I love Spotify, particularly the dynamic playlists that allow me to discover new music every day, Apple music just works so well across all my apple setup that I couldn’t resist. Note-taking: Roam Research As a very visual person I’m naturally drawn to apps like Bear notes or Craft but after a couple of tries, I’m now convinced that Rom is the best note-taking app for me. The main reason is that it solves my biggest problem with notes in general, the resurfacing of relevant content when needed. Before Roam, most of my notes would quickly fall by the wayside. With Roam, they just pop up when needed.</p>',
    original_date: '2021-08-20',
    slug: 'apps-i-can-t-live-without-v2022',
    description: 'Battle of the streaming giants',
  },
  {
    title: 'Python 101',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut lorem congue, mollis neque a, commodo tellus. Sed lobortis, quam ut dapibus fermentum, libero elit suscipit nunc, ut faucibus odio eros sit amet urna. Duis sagittis, sapien non aliquet tincidunt, nibh tellus tempor erat, at ornare ligula odio vestibulum est. Suspendisse eget sollicitudin lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean interdum enim non euismod dapibus. Ut placerat, ante rutrum hendrerit imperdiet, nisi nisi aliquet eros, non consectetur sapien massa vitae sem. Fusce rhoncus id arcu nec vestibulum.</p><p>Nullam condimentum dui eros, vitae malesuada leo posuere non. Praesent semper sit amet sapien nec tincidunt. Cras sodales in mi sit amet egestas. Sed tincidunt purus eros, at ultricies ex mollis lobortis. Maecenas dignissim semper est, sed scelerisque mauris placerat quis. Fusce faucibus vehicula dui, et efficitur justo varius lacinia. Donec lectus enim, condimentum vitae commodo sit amet, pellentesque sit amet quam. Maecenas ac lectus ut ante interdum pharetra non sit amet diam. Donec gravida nibh a elit dignissim viverra. Praesent accumsan lacinia venenatis. Vivamus quis odio vitae nulla iaculis pretium at vitae lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas lorem leo, ultricies vulputate ultricies eget, lobortis nec tellus.</p><p>Vestibulum ut tempus dolor. Ut faucibus, arcu finibus mattis varius, sem nisi convallis justo, ac posuere enim felis vel ante. Duis id pellentesque lectus, hendrerit suscipit neque. Donec neque lorem, molestie non quam et, tincidunt varius enim. Vivamus non sodales tellus. Curabitur facilisis elit a lacus ullamcorper blandit. Aenean semper justo ac sapien sagittis, ut condimentum arcu tempor. Pellentesque justo elit, feugiat ut ligula vel, laoreet commodo mauris. Donec tristique mauris mi, nec fringilla metus luctus ac. Donec maximus tortor elit, et sollicitudin tellus vehicula ut. Etiam ut volutpat justo.</p><p>In malesuada suscipit sem nec vehicula. Integer mattis, urna vel hendrerit pharetra, dolor justo sodales nulla, vitae faucibus erat sapien a tortor. Vestibulum et posuere quam, vitae lacinia sem. Curabitur gravida, mauris vel aliquet mattis, nunc lorem laoreet tortor, in aliquam odio leo non elit. Etiam eu sem id nisl ornare auctor at vel neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in nulla nunc. Praesent a urna eu nisl maximus pellentesque sit amet ac massa. Suspendisse aliquet ex at felis pellentesque aliquet.</p><p>Praesent nisl augue, gravida sit amet condimentum at, sodales gravida elit. Nulla ut placerat ante, quis ultrices urna. Maecenas et nisi massa. Phasellus iaculis sapien a dolor elementum varius. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a vehicula magna, vel faucibus mauris. In vel elit vel dolor rhoncus condimentum quis vitae lectus. Mauris volutpat turpis at elit feugiat, vel pretium dui vulputate.</p><p>Phasellus eget urna vitae arcu varius cursus. Ut eget libero eget turpis tincidunt fermentum. Fusce quis sapien vitae eros hendrerit euismod euismod id erat. Praesent porttitor molestie nibh, ut venenatis nibh suscipit ultrices. Sed consequat dolor nec tortor interdum ultricies. Donec ante elit, rhoncus id dui nec, consectetur viverra ligula. Donec eget interdum mi. Maecenas id tempus felis, ac aliquet elit. Morbi dictum commodo purus, quis dictum felis interdum non. Aliquam maximus felis nec nulla posuere viverra. Donec gravida arcu eu libero malesuada bibendum. Phasellus posuere felis molestie, efficitur erat sit amet, rutrum turpis. Nunc interdum justo lectus, ac tempor quam venenatis sollicitudin. Integer vitae pretium nunc, vel auctor leo.</p><p>Nulla vitae consectetur eros. Etiam elementum vehicula dui at facilisis. Mauris lectus turpis, accumsan vel lacinia suscipit, posuere sit amet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum vehicula lectus nec rutrum. Donec vitae euismod nibh. Nam condimentum felis mi, non luctus nulla suscipit vel. Duis tincidunt est augue, eget malesuada ante blandit sed. Vivamus semper hendrerit finibus. Nam pharetra tellus id turpis ultricies sollicitudin volutpat tristique odio. Donec aliquam odio orci, in ultrices ex pulvinar ut. Proin est ligula, accumsan consectetur nibh ac, eleifend lobortis diam. Mauris cursus consectetur ligula, eu consequat ligula blandit eget. Pellentesque accumsan id nisl in sodales. Sed porttitor gravida porta.</p>',
    original_date: '2021-07-23',
    slug: 'python-101',
    description: 'The basics of Python',
  },
  {
    title: 'Top 10 Flutter widgets',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut lorem congue, mollis neque a, commodo tellus. Sed lobortis, quam ut dapibus fermentum, libero elit suscipit nunc, ut faucibus odio eros sit amet urna. Duis sagittis, sapien non aliquet tincidunt, nibh tellus tempor erat, at ornare ligula odio vestibulum est. Suspendisse eget sollicitudin lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean interdum enim non euismod dapibus. Ut placerat, ante rutrum hendrerit imperdiet, nisi nisi aliquet eros, non consectetur sapien massa vitae sem. Fusce rhoncus id arcu nec vestibulum.</p><p>Nullam condimentum dui eros, vitae malesuada leo posuere non. Praesent semper sit amet sapien nec tincidunt. Cras sodales in mi sit amet egestas. Sed tincidunt purus eros, at ultricies ex mollis lobortis. Maecenas dignissim semper est, sed scelerisque mauris placerat quis. Fusce faucibus vehicula dui, et efficitur justo varius lacinia. Donec lectus enim, condimentum vitae commodo sit amet, pellentesque sit amet quam. Maecenas ac lectus ut ante interdum pharetra non sit amet diam. Donec gravida nibh a elit dignissim viverra. Praesent accumsan lacinia venenatis. Vivamus quis odio vitae nulla iaculis pretium at vitae lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas lorem leo, ultricies vulputate ultricies eget, lobortis nec tellus.</p><p>Vestibulum ut tempus dolor. Ut faucibus, arcu finibus mattis varius, sem nisi convallis justo, ac posuere enim felis vel ante. Duis id pellentesque lectus, hendrerit suscipit neque. Donec neque lorem, molestie non quam et, tincidunt varius enim. Vivamus non sodales tellus. Curabitur facilisis elit a lacus ullamcorper blandit. Aenean semper justo ac sapien sagittis, ut condimentum arcu tempor. Pellentesque justo elit, feugiat ut ligula vel, laoreet commodo mauris. Donec tristique mauris mi, nec fringilla metus luctus ac. Donec maximus tortor elit, et sollicitudin tellus vehicula ut. Etiam ut volutpat justo.</p><p>In malesuada suscipit sem nec vehicula. Integer mattis, urna vel hendrerit pharetra, dolor justo sodales nulla, vitae faucibus erat sapien a tortor. Vestibulum et posuere quam, vitae lacinia sem. Curabitur gravida, mauris vel aliquet mattis, nunc lorem laoreet tortor, in aliquam odio leo non elit. Etiam eu sem id nisl ornare auctor at vel neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in nulla nunc. Praesent a urna eu nisl maximus pellentesque sit amet ac massa. Suspendisse aliquet ex at felis pellentesque aliquet.</p><p>Praesent nisl augue, gravida sit amet condimentum at, sodales gravida elit. Nulla ut placerat ante, quis ultrices urna. Maecenas et nisi massa. Phasellus iaculis sapien a dolor elementum varius. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a vehicula magna, vel faucibus mauris. In vel elit vel dolor rhoncus condimentum quis vitae lectus. Mauris volutpat turpis at elit feugiat, vel pretium dui vulputate.</p><p>Phasellus eget urna vitae arcu varius cursus. Ut eget libero eget turpis tincidunt fermentum. Fusce quis sapien vitae eros hendrerit euismod euismod id erat. Praesent porttitor molestie nibh, ut venenatis nibh suscipit ultrices. Sed consequat dolor nec tortor interdum ultricies. Donec ante elit, rhoncus id dui nec, consectetur viverra ligula. Donec eget interdum mi. Maecenas id tempus felis, ac aliquet elit. Morbi dictum commodo purus, quis dictum felis interdum non. Aliquam maximus felis nec nulla posuere viverra. Donec gravida arcu eu libero malesuada bibendum. Phasellus posuere felis molestie, efficitur erat sit amet, rutrum turpis. Nunc interdum justo lectus, ac tempor quam venenatis sollicitudin. Integer vitae pretium nunc, vel auctor leo.</p><p>Nulla vitae consectetur eros. Etiam elementum vehicula dui at facilisis. Mauris lectus turpis, accumsan vel lacinia suscipit, posuere sit amet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum vehicula lectus nec rutrum. Donec vitae euismod nibh. Nam condimentum felis mi, non luctus nulla suscipit vel. Duis tincidunt est augue, eget malesuada ante blandit sed. Vivamus semper hendrerit finibus. Nam pharetra tellus id turpis ultricies sollicitudin volutpat tristique odio. Donec aliquam odio orci, in ultrices ex pulvinar ut. Proin est ligula, accumsan consectetur nibh ac, eleifend lobortis diam. Mauris cursus consectetur ligula, eu consequat ligula blandit eget. Pellentesque accumsan id nisl in sodales. Sed porttitor gravida porta.</p>',
    original_date: '2022-02-19',
    slug: 'top-10-flutter-widgets',
    description: 'Definetely the most awesome',
  },
  {
    title: 'Laravel & Blade',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut lorem congue, mollis neque a, commodo tellus. Sed lobortis, quam ut dapibus fermentum, libero elit suscipit nunc, ut faucibus odio eros sit amet urna. Duis sagittis, sapien non aliquet tincidunt, nibh tellus tempor erat, at ornare ligula odio vestibulum est. Suspendisse eget sollicitudin lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean interdum enim non euismod dapibus. Ut placerat, ante rutrum hendrerit imperdiet, nisi nisi aliquet eros, non consectetur sapien massa vitae sem. Fusce rhoncus id arcu nec vestibulum.</p><p>Nullam condimentum dui eros, vitae malesuada leo posuere non. Praesent semper sit amet sapien nec tincidunt. Cras sodales in mi sit amet egestas. Sed tincidunt purus eros, at ultricies ex mollis lobortis. Maecenas dignissim semper est, sed scelerisque mauris placerat quis. Fusce faucibus vehicula dui, et efficitur justo varius lacinia. Donec lectus enim, condimentum vitae commodo sit amet, pellentesque sit amet quam. Maecenas ac lectus ut ante interdum pharetra non sit amet diam. Donec gravida nibh a elit dignissim viverra. Praesent accumsan lacinia venenatis. Vivamus quis odio vitae nulla iaculis pretium at vitae lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas lorem leo, ultricies vulputate ultricies eget, lobortis nec tellus.</p><p>Vestibulum ut tempus dolor. Ut faucibus, arcu finibus mattis varius, sem nisi convallis justo, ac posuere enim felis vel ante. Duis id pellentesque lectus, hendrerit suscipit neque. Donec neque lorem, molestie non quam et, tincidunt varius enim. Vivamus non sodales tellus. Curabitur facilisis elit a lacus ullamcorper blandit. Aenean semper justo ac sapien sagittis, ut condimentum arcu tempor. Pellentesque justo elit, feugiat ut ligula vel, laoreet commodo mauris. Donec tristique mauris mi, nec fringilla metus luctus ac. Donec maximus tortor elit, et sollicitudin tellus vehicula ut. Etiam ut volutpat justo.</p><p>In malesuada suscipit sem nec vehicula. Integer mattis, urna vel hendrerit pharetra, dolor justo sodales nulla, vitae faucibus erat sapien a tortor. Vestibulum et posuere quam, vitae lacinia sem. Curabitur gravida, mauris vel aliquet mattis, nunc lorem laoreet tortor, in aliquam odio leo non elit. Etiam eu sem id nisl ornare auctor at vel neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in nulla nunc. Praesent a urna eu nisl maximus pellentesque sit amet ac massa. Suspendisse aliquet ex at felis pellentesque aliquet.</p><p>Praesent nisl augue, gravida sit amet condimentum at, sodales gravida elit. Nulla ut placerat ante, quis ultrices urna. Maecenas et nisi massa. Phasellus iaculis sapien a dolor elementum varius. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a vehicula magna, vel faucibus mauris. In vel elit vel dolor rhoncus condimentum quis vitae lectus. Mauris volutpat turpis at elit feugiat, vel pretium dui vulputate.</p><p>Phasellus eget urna vitae arcu varius cursus. Ut eget libero eget turpis tincidunt fermentum. Fusce quis sapien vitae eros hendrerit euismod euismod id erat. Praesent porttitor molestie nibh, ut venenatis nibh suscipit ultrices. Sed consequat dolor nec tortor interdum ultricies. Donec ante elit, rhoncus id dui nec, consectetur viverra ligula. Donec eget interdum mi. Maecenas id tempus felis, ac aliquet elit. Morbi dictum commodo purus, quis dictum felis interdum non. Aliquam maximus felis nec nulla posuere viverra. Donec gravida arcu eu libero malesuada bibendum. Phasellus posuere felis molestie, efficitur erat sit amet, rutrum turpis. Nunc interdum justo lectus, ac tempor quam venenatis sollicitudin. Integer vitae pretium nunc, vel auctor leo.</p><p>Nulla vitae consectetur eros. Etiam elementum vehicula dui at facilisis. Mauris lectus turpis, accumsan vel lacinia suscipit, posuere sit amet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum vehicula lectus nec rutrum. Donec vitae euismod nibh. Nam condimentum felis mi, non luctus nulla suscipit vel. Duis tincidunt est augue, eget malesuada ante blandit sed. Vivamus semper hendrerit finibus. Nam pharetra tellus id turpis ultricies sollicitudin volutpat tristique odio. Donec aliquam odio orci, in ultrices ex pulvinar ut. Proin est ligula, accumsan consectetur nibh ac, eleifend lobortis diam. Mauris cursus consectetur ligula, eu consequat ligula blandit eget. Pellentesque accumsan id nisl in sodales. Sed porttitor gravida porta.</p>',
    original_date: '2022-01-20',
    slug: 'laravel-and-blade',
    description: 'Match made in heaven',
  },
  {
    title: 'SpriteKit Tutorial: Creating your first iOS game',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut lorem congue, mollis neque a, commodo tellus. Sed lobortis, quam ut dapibus fermentum, libero elit suscipit nunc, ut faucibus odio eros sit amet urna. Duis sagittis, sapien non aliquet tincidunt, nibh tellus tempor erat, at ornare ligula odio vestibulum est. Suspendisse eget sollicitudin lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean interdum enim non euismod dapibus. Ut placerat, ante rutrum hendrerit imperdiet, nisi nisi aliquet eros, non consectetur sapien massa vitae sem. Fusce rhoncus id arcu nec vestibulum.</p><p>Nullam condimentum dui eros, vitae malesuada leo posuere non. Praesent semper sit amet sapien nec tincidunt. Cras sodales in mi sit amet egestas. Sed tincidunt purus eros, at ultricies ex mollis lobortis. Maecenas dignissim semper est, sed scelerisque mauris placerat quis. Fusce faucibus vehicula dui, et efficitur justo varius lacinia. Donec lectus enim, condimentum vitae commodo sit amet, pellentesque sit amet quam. Maecenas ac lectus ut ante interdum pharetra non sit amet diam. Donec gravida nibh a elit dignissim viverra. Praesent accumsan lacinia venenatis. Vivamus quis odio vitae nulla iaculis pretium at vitae lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas lorem leo, ultricies vulputate ultricies eget, lobortis nec tellus.</p><p>Vestibulum ut tempus dolor. Ut faucibus, arcu finibus mattis varius, sem nisi convallis justo, ac posuere enim felis vel ante. Duis id pellentesque lectus, hendrerit suscipit neque. Donec neque lorem, molestie non quam et, tincidunt varius enim. Vivamus non sodales tellus. Curabitur facilisis elit a lacus ullamcorper blandit. Aenean semper justo ac sapien sagittis, ut condimentum arcu tempor. Pellentesque justo elit, feugiat ut ligula vel, laoreet commodo mauris. Donec tristique mauris mi, nec fringilla metus luctus ac. Donec maximus tortor elit, et sollicitudin tellus vehicula ut. Etiam ut volutpat justo.</p><p>In malesuada suscipit sem nec vehicula. Integer mattis, urna vel hendrerit pharetra, dolor justo sodales nulla, vitae faucibus erat sapien a tortor. Vestibulum et posuere quam, vitae lacinia sem. Curabitur gravida, mauris vel aliquet mattis, nunc lorem laoreet tortor, in aliquam odio leo non elit. Etiam eu sem id nisl ornare auctor at vel neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in nulla nunc. Praesent a urna eu nisl maximus pellentesque sit amet ac massa. Suspendisse aliquet ex at felis pellentesque aliquet.</p><p>Praesent nisl augue, gravida sit amet condimentum at, sodales gravida elit. Nulla ut placerat ante, quis ultrices urna. Maecenas et nisi massa. Phasellus iaculis sapien a dolor elementum varius. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a vehicula magna, vel faucibus mauris. In vel elit vel dolor rhoncus condimentum quis vitae lectus. Mauris volutpat turpis at elit feugiat, vel pretium dui vulputate.</p><p>Phasellus eget urna vitae arcu varius cursus. Ut eget libero eget turpis tincidunt fermentum. Fusce quis sapien vitae eros hendrerit euismod euismod id erat. Praesent porttitor molestie nibh, ut venenatis nibh suscipit ultrices. Sed consequat dolor nec tortor interdum ultricies. Donec ante elit, rhoncus id dui nec, consectetur viverra ligula. Donec eget interdum mi. Maecenas id tempus felis, ac aliquet elit. Morbi dictum commodo purus, quis dictum felis interdum non. Aliquam maximus felis nec nulla posuere viverra. Donec gravida arcu eu libero malesuada bibendum. Phasellus posuere felis molestie, efficitur erat sit amet, rutrum turpis. Nunc interdum justo lectus, ac tempor quam venenatis sollicitudin. Integer vitae pretium nunc, vel auctor leo.</p><p>Nulla vitae consectetur eros. Etiam elementum vehicula dui at facilisis. Mauris lectus turpis, accumsan vel lacinia suscipit, posuere sit amet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum vehicula lectus nec rutrum. Donec vitae euismod nibh. Nam condimentum felis mi, non luctus nulla suscipit vel. Duis tincidunt est augue, eget malesuada ante blandit sed. Vivamus semper hendrerit finibus. Nam pharetra tellus id turpis ultricies sollicitudin volutpat tristique odio. Donec aliquam odio orci, in ultrices ex pulvinar ut. Proin est ligula, accumsan consectetur nibh ac, eleifend lobortis diam. Mauris cursus consectetur ligula, eu consequat ligula blandit eget. Pellentesque accumsan id nisl in sodales. Sed porttitor gravida porta.</p>',
    original_date: '2022-02-20',
    slug: 'sprite-kit-tutorial-creating-your-first-i-os-game',
    description: 'From start to published game',
  },
]

// Make sure you have the right permissions:
// In Strapi > Settings > User & permissions > roles > public, tick the create permissions for all entities.
// And have the permission for the Upload thingy

async function seedDb() {
  let articlesCheck = await getArticles()

  if (articlesCheck.length > 0) {
    return
  }
  // We can expect an empty database here

  const authorIds = await seedAuthors()
  const categoryIds = await seedCategories()
  const tagIds = await seedTags()
  const imageIds = await seedImages()
  await seedArticles(authorIds, categoryIds, tagIds, imageIds)
}

async function getArticles() {
  let result = []
  try {
    const response = await axios.get(`${process.env.URL}/articles`)
    result = await response.data
  } catch (err) {
    console.log(
      'Getting articles went wrong! See error above or the logging of the strapi server',
    )
  }
  return result
}

async function seedAuthors() {
  const authorIds = []
  for (const author of authors)
    try {
      const response = await axios.post(`${process.env.URL}/authors`, author)
      authorIds.push(response.data.id)
    } catch (err) {
      console.log(
        'Setting authors went wrong! See error above or the logging of the strapi server',
        err,
      )
    }
  console.log(
    getConsoleColor(authors.length, authorIds.length),
    `${authorIds.length} authors set`,
  )
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
        'Setting categories went wrong! See error above or the logging of the strapi server',
        err,
      )
    }
  console.log(
    getConsoleColor(categories.length, categoryIds.length),
    `${categoryIds.length} categories set`,
  )
  return categoryIds
}

async function seedTags() {
  const tagIds = []
  for (const tag of tags)
    try {
      const response = await axios.post(`${process.env.URL}/tags`, tag)
      tagIds.push(response.data.id)
    } catch (err) {
      console.log(
        'Setting tags went wrong! See error above or the logging of the strapi server',
        err,
      )
    }
  console.log(
    getConsoleColor(tags.length, tagIds.length),
    `${tagIds.length} tags set`,
  )
  return tagIds
}

async function seedImages() {
  // We create a temporary map to store the seed images
  try {
    await fsPromises.mkdir(IMAGES_PATH)
  } catch (err) {
    console.log('Making the folder went wrong', err)
  }

  // This bit's not pretty... feel free to improve :D
  const imageIds = []
  for (const image of images) {
    try {
      console.log('trying image', image)
      var data = new FormData()
      const pipeInput = fs.createWriteStream(`${IMAGES_PATH}/${image.name}.jpg`)
      request(image.url).pipe(pipeInput)

      setTimeout(() => {
        const readStream = fs.createReadStream(`${IMAGES_PATH}/${image.name}.jpg`)
        data.append('files', readStream)
      }, 1000)

      setTimeout(async () => {
        console.log('posting', image, typeof data)
        const response = await axios({
          method: 'POST',
          url: `${process.env.URL}/upload`,
          data: data,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        })

        imageIds.push(response.data[0].id)
      }, 3000)

      await new Promise(r => setTimeout(r, 5000));
    } catch (err) {
      console.log(
        'Setting images went wrong! See error above or the logging of the strapi server',
        err.toJSON().message,
      )
    }
  }

  console.log(
    getConsoleColor(images.length, imageIds.length),
    `${imageIds.length} images set`,
  )

  // We remove the temporary map
  try {
    if (fs.existsSync(IMAGES_PATH)) {
      fs.rmSync(IMAGES_PATH, { recursive: true, force: true })
    } else {
      console.log('Directory path not found.')
    }
  } catch (err) {
    console.log('Removing dir went wrong', err)
  }

  return imageIds
}

async function seedArticles(authorIds, categoryIds, tagIds, imageIds) {
  const articleIds = []
  for (let [index, article] of articles.entries()) {
    try {
      // pick 1 to 3 tags
      const nrTags = Math.floor(Math.random() * 3) + 1
      const localTags = []
      for (var t = 0; t < nrTags; t++) {
        localTags.push({ id: getNextItemFrom(tagIds, index) })
      }

      const newArticle = {
        ...article,
        author: {
          id: getNextItemFrom(authorIds, index),
        },
        category: {
          id: getNextItemFrom(categoryIds, index),
        },
        localTags,
        cover_image: {
          id: getNextItemFrom(imageIds, index),
        },
      }
      const response = await axios.post(
        `${process.env.URL}/articles`,
        newArticle,
      )
      articleIds.push(response.data.id)
    } catch (err) {
      console.log(
        'Setting articles went wrong! See error above or the logging of the strapi server',
        err.toJSON().message,
      )
    }
  }
  console.log(
    getConsoleColor(articles.length, articleIds.length),
    `${articleIds.length} articles set`,
  )
}

function getNextItemFrom(array, index) {
  return array[index % array.length]
}

// Colors for console:
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const consoleColorRed = '\x1b[31m%s\x1b[0m'
const consoleColorYellow = '\x1b[33m%s\x1b[0m'
const consoleColorGreen = '\x1b[32m%s\x1b[0m'

// Function to determine the color of a console message, comparing two values
function getConsoleColor(desiredValue, actualValue) {
  if (actualValue === 0) {
    return consoleColorRed
  } else if (actualValue < desiredValue) {
    return consoleColorYellow
  } else if (actualValue === desiredValue) {
    return consoleColorGreen
  }
}

seedDb()
