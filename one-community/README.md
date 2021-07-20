# one-community

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Locally test login with GitHub

### Setup ngrok

Open an ngrok pipeline on the backend:

- Download ngrok.exe
- Go to the exe's location in a terminal
- Type ./ngrok http 1337
- Copy the ngrok location (http://54847af08315.ngrok.io or something)

### Change server.js

In server.js add a line to the object:
`url: "<ngrok-url>",`

This should reset the running server to that location (localhost:1337 still works and is much faster)

### Change .env

.env

- change STRAPI_URL to <ngrok-url>
