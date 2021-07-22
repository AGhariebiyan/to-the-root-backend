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

- [Download ngrok.exe](https://ngrok.com/download)
- Go to the ngrok location in a terminal
- Type `./ngrok http 1337`
- Copy the `<ngrok-url>` (it should look like `http://54847af08315.ngrok.io`)

### Add a GitHub OAuth application

[Add a GitHub application](https://github.com/settings/applications/new)
As application homepage, use the `<ngrok-url>`.

As callback url, add `<nrgok-url>/connect/github/callback`

Copy the Client ID and Client secret of the application and save for later.

### Change both .env's

Change STRAPI_URL in the frontend .env to `<ngrok-url>`
Change URL in the backend .env to `<ngrok-url>`

Reset both applications.

### Setup Strapi provider

In Strapi, go to Settings > Providers > Github

- Enable the GitHub provider
- Add the Client ID and Client secret from the Github app
- As a redirect URL to your front-end app, add: `http://localhost:3000/connect/github`

This will redirect the user to `\_provider.vue`, where the logging in is handled.
