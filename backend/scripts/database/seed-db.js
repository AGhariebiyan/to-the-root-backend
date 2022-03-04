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

const articles = [
  {
    title: '10 Best tech gadgets you need in your life',
    content:
      '<p>Your life is about to get a little simpler and more fulfilling with our list of the top 10 best gadgets for daily use. Because sometimes we need a helping hand or a nudge in the right direction to make healthier choices. If you’re reaching to tech for guidance, you’re in the right place with today’s Daily Digest. Enhance your leisure time, get more creative at work, feel safer indoors, and more with our list of the best tech gadgets for everyday use.</p><ul><li>We crafted a list of some must-have tech that you can easily incorporate into your daily routine. Want to stand up straighter? There’s a gadget for that. Planning on upping your fitness regime? We have the equipment for that. There’s so much more to discover in today’s article, too.</li><li>The best air purifiers of 2021 for your home We included a smart breath training system that assesses your breathing health and provides exercises to increase your lung capacity. We also included a smart robot vacuum that learns your cleaning habits and features voice assistants. Explore all of our recommended tech in the list below.</li></ul><blockquote>The #1 gadget is the MacBook Pro 2021</blockquote><p>Best of all, the adjustable stand makes Tabletop mode ideal for multiplayer gaming. Or the built-in wired LAN port is great for using in the TV mode gaming. This item is available for order on October 8 for $349.99. 2. Take your well-being to new heights with the Airofit PRO smart breath training system. See improvements in your lung capacity in just a couple of weeks with 5–10 minutes of use daily. Designed in the form of a tiny gadget, you can take the Airofit PRO smart breath training system everywhere you go. It comes with an app that analyzes your lung capacity, anaerobic threshold, respiratory strength, and other areas of your breathing. You’ll then receive all of this data to your phone, where you can make improvements.</p>',
    original_date: '2021-07-23',
    slug: '10-best-tech-gadgets-you-need-in-your-life',
    description: 'A short article about anything',
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
    title: 'Netflix vs Prime: Streaming quality comparison',
    content:
      '<p>With this post, my wish is to highlight some of the great apps I use in my daily life. Let me start by giving you some context that may help understand my choices a bit better. Personally, I’m a tech geek and an Apple fanboy, so I’ll be mostly talking about apps in the Apple ecosystem. Professionally I’ve been working in web development for the last 20 years, started as a developer, and now I lead tech and product teams. Currently, I’m CTO at sheerME. Let’s dive into the apps, starting with my Macbook Pro. I’m working in a 13-inch core i5 from 2016 with 16GB of ram (eagerly awaiting the arrival of my M1 Macbook Pro). The browser of choice: Google Chrome Two reasons why I prefer chrome, the devtools, and the extension ecosystem. These are the extensions I currently use: Metamask: A crypto wallet (I’m big into Ethereum)&nbsp;</p><p>Defi Saver Gas Price extension: Also for the Ethereum ecosystem, it keeps me informed of gas prices (used to pay for transactions inside the network) Ghostery: My preferred ad blocker Raindrop.io: A very well done bookmark manager where I store bookmarks for future reference but also where I drop articles I want to read later. raindrop.io bookmark manager Mail Client: Superhuman It’s a bit on the expensive side but it helps me deal with email a lot faster than all the other clients I tried so for someone that spends a big chunk of his day on email, it’s well worth it. I’m very tempted to try hey.com from the basecamp guys but I can’t switch to a hey.com email address so for now I’ll stick with Superhuman. Calendar App: Fantastical Fantastical is all about the little details… the way you can identify a zoom, hangout, skype call or any other just by looking at the event in the calendar, the small icon that tells you how the weather is for the day, the natural language parser that enables you to create events just by typing what you want…&nbsp;</p><blockquote><p>4K HDR</p></blockquote><p>Fantastical Music Player: Spotif…Apple Music Being so entrenched in the Apple ecosystem it is very hard not to go with apple music, as much as I love Spotify, particularly the dynamic playlists that allow me to discover new music every day, Apple music just works so well across all my apple setup that I couldn’t resist. Note-taking: Roam Research As a very visual person I’m naturally drawn to apps like Bear notes or Craft but after a couple of tries, I’m now convinced that Rom is the best note-taking app for me. The main reason is that it solves my biggest problem with notes in general, the resurfacing of relevant content when needed. Before Roam, most of my notes would quickly fall by the wayside. With Roam, they just pop up when needed.</p>',
    original_date: '2021-08-20',
    slug: 'apps-i-can-t-live-without-v2022',
    description: 'The best apps to own right now',
  },
  {
    title: 'Python 101',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut lorem congue, mollis neque a, commodo tellus. Sed lobortis, quam ut dapibus fermentum, libero elit suscipit nunc, ut faucibus odio eros sit amet urna. Duis sagittis, sapien non aliquet tincidunt, nibh tellus tempor erat, at ornare ligula odio vestibulum est. Suspendisse eget sollicitudin lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean interdum enim non euismod dapibus. Ut placerat, ante rutrum hendrerit imperdiet, nisi nisi aliquet eros, non consectetur sapien massa vitae sem. Fusce rhoncus id arcu nec vestibulum.</p><p>Nullam condimentum dui eros, vitae malesuada leo posuere non. Praesent semper sit amet sapien nec tincidunt. Cras sodales in mi sit amet egestas. Sed tincidunt purus eros, at ultricies ex mollis lobortis. Maecenas dignissim semper est, sed scelerisque mauris placerat quis. Fusce faucibus vehicula dui, et efficitur justo varius lacinia. Donec lectus enim, condimentum vitae commodo sit amet, pellentesque sit amet quam. Maecenas ac lectus ut ante interdum pharetra non sit amet diam. Donec gravida nibh a elit dignissim viverra. Praesent accumsan lacinia venenatis. Vivamus quis odio vitae nulla iaculis pretium at vitae lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas lorem leo, ultricies vulputate ultricies eget, lobortis nec tellus.</p><p>Vestibulum ut tempus dolor. Ut faucibus, arcu finibus mattis varius, sem nisi convallis justo, ac posuere enim felis vel ante. Duis id pellentesque lectus, hendrerit suscipit neque. Donec neque lorem, molestie non quam et, tincidunt varius enim. Vivamus non sodales tellus. Curabitur facilisis elit a lacus ullamcorper blandit. Aenean semper justo ac sapien sagittis, ut condimentum arcu tempor. Pellentesque justo elit, feugiat ut ligula vel, laoreet commodo mauris. Donec tristique mauris mi, nec fringilla metus luctus ac. Donec maximus tortor elit, et sollicitudin tellus vehicula ut. Etiam ut volutpat justo.</p><p>In malesuada suscipit sem nec vehicula. Integer mattis, urna vel hendrerit pharetra, dolor justo sodales nulla, vitae faucibus erat sapien a tortor. Vestibulum et posuere quam, vitae lacinia sem. Curabitur gravida, mauris vel aliquet mattis, nunc lorem laoreet tortor, in aliquam odio leo non elit. Etiam eu sem id nisl ornare auctor at vel neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in nulla nunc. Praesent a urna eu nisl maximus pellentesque sit amet ac massa. Suspendisse aliquet ex at felis pellentesque aliquet.</p><p>Praesent nisl augue, gravida sit amet condimentum at, sodales gravida elit. Nulla ut placerat ante, quis ultrices urna. Maecenas et nisi massa. Phasellus iaculis sapien a dolor elementum varius. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a vehicula magna, vel faucibus mauris. In vel elit vel dolor rhoncus condimentum quis vitae lectus. Mauris volutpat turpis at elit feugiat, vel pretium dui vulputate.</p><p>Phasellus eget urna vitae arcu varius cursus. Ut eget libero eget turpis tincidunt fermentum. Fusce quis sapien vitae eros hendrerit euismod euismod id erat. Praesent porttitor molestie nibh, ut venenatis nibh suscipit ultrices. Sed consequat dolor nec tortor interdum ultricies. Donec ante elit, rhoncus id dui nec, consectetur viverra ligula. Donec eget interdum mi. Maecenas id tempus felis, ac aliquet elit. Morbi dictum commodo purus, quis dictum felis interdum non. Aliquam maximus felis nec nulla posuere viverra. Donec gravida arcu eu libero malesuada bibendum. Phasellus posuere felis molestie, efficitur erat sit amet, rutrum turpis. Nunc interdum justo lectus, ac tempor quam venenatis sollicitudin. Integer vitae pretium nunc, vel auctor leo.</p><p>Nulla vitae consectetur eros. Etiam elementum vehicula dui at facilisis. Mauris lectus turpis, accumsan vel lacinia suscipit, posuere sit amet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum vehicula lectus nec rutrum. Donec vitae euismod nibh. Nam condimentum felis mi, non luctus nulla suscipit vel. Duis tincidunt est augue, eget malesuada ante blandit sed. Vivamus semper hendrerit finibus. Nam pharetra tellus id turpis ultricies sollicitudin volutpat tristique odio. Donec aliquam odio orci, in ultrices ex pulvinar ut. Proin est ligula, accumsan consectetur nibh ac, eleifend lobortis diam. Mauris cursus consectetur ligula, eu consequat ligula blandit eget. Pellentesque accumsan id nisl in sodales. Sed porttitor gravida porta.</p>',
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
// Generating and uploading images does not work for now. I did not find how to fill the Media Library through API.

async function seedDb() {
  let articles = await getArticles()

  if (articles.length > 0) {
    return
  }
  // We can expect an empty database here

  const authorIds = await seedAuthors()
  const categoryIds = await seedCategories()
  const tagIds = await seedTags()
  await seedArticles(authorIds, categoryIds, tagIds)
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

async function seedTags() {
  const tagIds = []
  for (const tag of tags)
    try {
      const response = await axios.post(`${process.env.URL}/tags`, tag)
      tagIds.push(response.data.id)
    } catch (err) {
      console.log(
        err.data,
        'Setting tags went wrong! See error above or the logging of the strapi server',
      )
    }
  console.log(`${tagIds.length} tags set`)
  return tagIds
}

async function seedArticles(authorIds, categoryIds, tagIds) {
  for (let [index, article] of articles.entries())
    try {
      // pick 1 to 3 tags
      const nrTags = Math.floor(Math.random() * 3) + 1
      const tags = []
      for (var t = 0; t < nrTags; t++) {
        tags.push({ id: getNextItemFrom(tagIds, index) })
      }

      article = {
        ...article,
        author: {
          id: getNextItemFrom(authorIds, index),
        },
        category:
        {
          id: getNextItemFrom(categoryIds, index),
        },
        tags
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
