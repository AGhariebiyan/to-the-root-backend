# To The Root

## Build Setup

`npm run dev`

## How to locally test logging in with GitHub

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

Rebuild both applications.

### Setup Strapi provider

In Strapi, go to Settings > Providers > Github

- Enable the GitHub provider
- Add the Client ID and Client secret from the Github app
- As a redirect URL to your front-end app, add: `http://localhost:3000/connect/github`

This will redirect the user to `\_provider.vue`, where the logging in is handled.

### Setup email settings in Strapi for Sendgrid

In Strapi, go to Settings > Email Plugin > Email Settings
Here you can setup your own email as the test email.

In Strapi, go to Settings > User & Permissions Plugin > Email Templates > Reset Password
Change "shipper name" to Ahead of Change, change "shipper email" to totherootdev@gmail.com

In Strapi, go to Settings > User & Permissions Plugin > Advanced Settings
And make sure the reset password page is set to http://localhost:3000/password/reset for testing

Please note the Sendgrid account will need to change ownership at some point, as it requires a phone authentication app to login.
We will also need a domain rather than a single sender for this once a proper domain has been setup for us.

### Setup Algolia for searching content

See the root folder's readme.
