# How to start the app

When we start this app two processes will run simultaneously:

1. one-community-fe Nuxt front end client
2. strapi server instance

This is what pm2 is used for. So first please install PM2: https://pm2.keymetrics.io/docs/usage/quick-start/

PM2 has different commands, but for this project these are the ones mostly used:

1. ```bash
   pm2 start ecosystem.config.js
   ```
2. Open a new terminal and run, so you can see the output of the two processes running
   ```bash
   pm2 logs
   ```
3. pm2 restart all, 0 or 1(corresponding to the id in the table printed out to the console) depending on what you want to restart
4. pm2 stop all to stop all services

Some possible errors to occur locally:

- I can't add a picture to my article (internal server error)

  - Make sure you have an "uploads" folder in the public map.

- I can't see my article in the front end, but I see it in Strapi
  - Did you _publish_ it in Strapi?
