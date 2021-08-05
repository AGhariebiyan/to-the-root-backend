# How to start the app

When we start this app two processes will run simultaneously:

1. one-community-fe Nuxt front end client
2. strapi server instance

In the one-community folder (one-community/one-community) lives the frontend. Run "npm run dev" there to start up the frontend on localhost:3000 (by default)
In the one-community-backend folder (one-community/one-community) lives the backend. Run "npm run develop" there to start up the backend on localhost:1337 (by default)

Take the env.example, make a copy and turn it into a .env file.

You can change the locations in your .env file if you like.

## Errors

Some possible errors to occur locally:

- I can't add a picture to my article (internal server error)

  - Make sure you have an "uploads" folder in the public map.

- I can't see my article in the front end, but I see it in Strapi
  - Did you _publish_ it in Strapi?
