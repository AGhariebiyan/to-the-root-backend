# Welcome To The Root!

## Project structure

Our frontend is written using the [Vue.js](https://vuejs.org) and [NuxtJS](https://nuxtjs.org) frameworks. After completing the setup, the frontend is accessible on [localhost:3000](http://localhost:3000). 

The backend is built using [Strapi](https://strapi.io). This is where articles, authors, categories and other content is stored. The backend will be referred to as the **Strapi admin panel** and is accessible on [localhost:1337](http://localhost:1337/admin/) after completing this setup.

You won't have to interact with the database directly (this is all handled by Strapi), but of course a database is used to store the content. The database of choice is [PostgreSQL](https://www.postgresql.org).

We use [Algolia](https://www.algolia.com) as a hosted search engine to make sure we have a well optimised search functionality. 

## Minimal setup

The situation: You just cloned the repo to your computer and want to get going. Here is what to do.

In the minimal setup, you can view the site and search for articles.

> If you get stuck, take a look at the _Common problems_ section below

### Algolia

We start by setting up an Algolia index. This index will be basicallly a stripped down, but optimised mirror image of your Strapi database. We want to do this before setting up Strapi, because this allows you to create your own development environment with a local Strapi database that is in sync with your own Algolia index.

1. Log in to Algolia using the credentials in the [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/262146/Accounts)
2. Go to Search and under Index, click New > Index.
3. Create a new index and name it something you like. I named mine 'joran_content'

### Backend

1. Start a terminal of your choice
2. cd into the backend folder
3. Copy the .env.example and rename the file to .env
4. Set the ALGOLIA_INDEX is set to the name of your own Algolia index. For example: 'joran_content'
5. Set the ALGOLIA_APP_ID (in Algolia, see Overview > API Keys > Application ID) 
5. Set the ALGOLIA_ADMIN_KEY (in Algolia, see Overview > API Keys > Admin API Key) 
5. Set the ALGOLIA_SEARCH_KEY (in Algolia, see Overview > API Keys > Search-Only API Key) 
5. Run `npm i` to install npm packages
6. Run `npm run dev` to start the Strapi server
7. A Strapi instance should start, serving the app on localhost:1337
8. Go to [localhost:1337](http://localhost:1337) and create a Strapi admin account

### Database

Now that Strapi is setup, we can setup permission to populate the database with some sample data:

1. Go to the [Strapi admin panel](http://localhost:1337/admin/) 
2. Go to Settings > User & permissions > roles > public 
3. Tick the 'create' permissions for all entities
4. Be sure to to save your changes

Now Strapi is ready to be populated: 

5. Still in the backend folder, run `npm run seed-db`. Make sure Strapi is still running, so don't kill the process but rather open up a second terminal. This script file contains some sample data and will populate Strapi with it. The images of the articles won't work though. So for now, it is advised to add your own articles (see below).
6. Run `npm run content-to-algolia` to fill your own Algolia index with the data you just created in your Strapi database. 

### Algolia (yes, again)

Now that you've got some data in your Algolia index, you can tweak how Algolia presents search results.

1. In [Algolia](https://www.algolia.com), go to Search and select your own index.
2. Under Configuration > Searchable attributes, add: 
    - author.name
    - content
    - description
    - categories.name

This ensures everyone uses the same search logic. 

> The dev_content index acts as an example. This index was created using the same sample data.

### Frontend

1. Cd into the frontend folder using your favourite terminal
2. Copy the .env.example and rename the file to .env
3. Set the ALGOLIA_INDEX is set to the name of your own Algolia index. For example: 'joran_content'
4. Set the ALGOLIA_APP_ID (in Algolia, see Overview > API Keys > Application ID) 
5. Set the ALGOLIA_SEARCH_KEY (in Algolia, see Overview > API Keys > Search-Only API Key) 
6. run `npm i` to install npm packages
7. run `npm run dev`
8. A nuxt server should start, serving the app on [localhost:3000](http://localhost:3000)

Take a look at some overview pages, such as the search page. Everything you see here is powered by Algolia. When you click on an article however, you're taken to the article detail page and the information here is retrieved from the Strapi database.

## Additional functionality

### Creating your own articles

You can create your own content in Strapi.

1. Create a folder named "uploads" in backend/public. This is needed to upload images.
2. Go to the [localhost:1337](http://localhost:1337) to access the Strapi admin panel
3. Create an admin account if you haven't already and login
4. In Articles (top left) create an article (or more of course)
5. Publish the article. Only now it will show up in Algolia and the frontend.

### Enable login as a user

To login as a user in the frontend, you'll have to setup [Sendgrid](https://sendgrid.com) in order to enable the 'confirm email' and 'reset password' functionality. You can find the login credentials for the To The Root Sendgrid account in the [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/262146/Accounts).

1. Go to the [Strapi admin panel](http://localhost:1337/admin/)
2. Go to Settings > Advanced Settings and set 'Enable email configuration' to 'ON'
3. In your backend .env, set the SENDGRID_API_KEY. You can find it in the [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/53215239/.env+variables)

This is temporary as we'd need to upgrade to a domain instead of a single sender in the future.

### Sending emails

To enable signing up to mailing lists (on /open-source, /contribute or /discord) or sending a contact request using the contact form, you will have to setup [EmailJS](https://www.emailjs.com).

In your frontend .env:
1. Set the EMAILJS_SERVICE_ID (see [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/53215239/.env+variables)).
2. Set the EMAILJS_USER_ID (see [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/53215239/.env+variables)).

## Common problems

### It just doesn't work

Have you tried rebuilding your frontend and backend server?

### I get a 403: Forbidden

This usually has something to do with permissions not set correctly in Strapi. See _Database, steps 1 to 4_. In Strapi, there are 2 kinds of permissions. 

1. For admins (people who do stuff in Strapi). You can set these permissions under Settings > Roles (Administration Panel).
2. For users (people who created an account in the frontend). You can set these permissions under Settings > Roles (Users & Permissions Plugin).

### I can't see my article in the front end, but I see it in Strapi

Did you _publish_ it in Strapi? See _Creating your own articles, step 5_.

### I can't add a picture to my article (internal server error)

Make sure you have an "uploads" folder in the public map. See _Creating your own articles, step 1_.

### My Algolia index is not searchable

Did you create searchable attributes in Algolia for your index? See _Algolia (yes, again)'_.