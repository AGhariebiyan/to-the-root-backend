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
2. Go to Search and under Index, click _New > Index_.
3. Create a new index and name it something you like. As a default, go with <your_name>_content.

### Backend

1. Start a terminal of your choice
2. cd into the backend folder
3. Copy the .env.example and rename the file to .env
4. Set the ALGOLIA_INDEX is set to the name of your own Algolia index.
5. Set the ALGOLIA_APP_ID (in Algolia, see _Overview > API Keys > Application ID_) 
6. Set the ALGOLIA_ADMIN_KEY (in Algolia, see _Overview > API Keys > Admin API Key_) 
7. Set the ALGOLIA_SEARCH_KEY (in Algolia, see _Overview > API Keys > Search-Only API Key_) 
8. Run `npm i` to install npm packages
9. Run `npm run dev` to start the Strapi server
10. A Strapi instance should start, serving the app on localhost:1337
11. Go to [localhost:1337](http://localhost:1337) and create a Strapi admin account

#### Adding sample data

Now that Strapi is setup, we can setup permission to populate the database with some sample data:

1. Go to the [Strapi admin panel](http://localhost:1337/admin/) 
2. Go to _Settings > Roles (Users & Permissions Plugin) > Public_ 
3. Tick the 'find' permission for the Article entity
4. Tick the 'create' permission for the Article, Author, Category, Tag and Featured entities
5. Expand the _UPLOAD_ dropdown (below _APPLICATION_ permissions) and tick the 'upload' permission
6. Be sure to to save your changes

Now Strapi is ready to be populated: 

7. Create a folder named "uploads" in backend/public. This is needed to upload images.
8. Still in the backend folder, run `npm run seed-db`. Make sure Strapi is still running, so don't kill the process but rather open up a second terminal. This script file (backend/scripts/database/seed-db.js) contains some sample data and will populate Strapi with it. Your console will tell you how much entities have been seeded. Logs will pop up <span style="color:green">green</span> if all sample data was successfully seeded, <span style="color:yellow">yellow</span> if some sample data has been successfully seeded and <span style="color:red">red</span> if no sample data of that entity has been successfully seeded.
9. Run `npm run content-to-algolia` to fill your own Algolia index with the data you just created in your Strapi database. 

#### More on permissions

Later on, when you've got the frontend up-and-running, everything will work just fine and you are allowed to view articles. However, when you sign up and log in as a user, access will be denied. For every action you perform as an admin in Strapi or as a user in the frontend, you have to grant the right permissions in Strapi. 

- For admins (people who do stuff in Strapi). You can set these permissions under _Settings > Roles (Administration Panel)_.
- For users (people who created an account in the frontend). You can set these permissions under _Settings > Roles (Users & Permissions Plugin)_.

Strapi sets a few permissions for Public users by default. This is why you'll have no problem viewing articles when you're not logged in as a user for example. However, this permission is not set for Authenticated (logged in) users. Let's change that: 

1. Go to the [Strapi admin panel](http://localhost:1337/admin/) again
2. Go to _Settings > Users & Permissions Plugin > Roles > Authenticated_
3. Tick the 'find' permission for the Article entity
4. Be sure to save your changes

> When developing, you'll probably have to set more than just the permissions we set so far. When you encounter a **403 (Forbidden)**, this is often a clue that you haven't set the permissions correctly.

### Algolia (yes, again)

Now that you've got some data in your Algolia index, you can tweak how Algolia presents search results.

1. In [Algolia](https://www.algolia.com), go to Search and select your own index.
2. Under _Configuration > Searchable attributes_, add: 
    - title
    - description
    - author.name
    - category.name
    - tags.name
    - content
3. Click 'Review and Save Settings' and save your settings
4. Under _Configuration > Facets_, add the attribute 'tags.name'
5. Click 'Review and Save Settings' and save your settings again

This ensures everyone uses the same search logic. 

> The dev_content index acts as an example. This index was created using the same sample data.

### Frontend

1. Cd into the frontend folder using your favourite terminal
2. Copy the .env.example and rename the file to .env
3. Set the ALGOLIA_INDEX to the name of your own Algolia index.
4. Set the ALGOLIA_APP_ID (in Algolia, see _Overview > API Keys > Application ID_) 
5. Set the ALGOLIA_SEARCH_KEY (in Algolia, see _Overview > API Keys > Search-Only API Key_) 
6. Run `npm i` to install npm packages
7. Run `npm run dev`
8. A nuxt server should start, serving the app on [localhost:3000](http://localhost:3000)

Take a look at some overview pages, such as the search page. Everything you see here is powered by Algolia. When you click on an article however, you're taken to the article detail page and the information here is retrieved from the Strapi database.

## Additional functionality

### Creating your own articles

You can create your own content in Strapi.

> Make sure you have a folder named "uploads" in backend/public. This is needed to upload images. If you've followed the _Minimal setup_ and thus seeded your database (_Adding sample data_) you have already done this.

1. Go to [localhost:1337](http://localhost:1337) to access the Strapi admin panel
2. Create an admin account if you haven't already and login
3. Go to Articles (top left) to get an overview of the sample articles
4. Click 'Add new articles' (top right)
5. Create your new article and hit 'Save'
6. Make sure to hit 'Publish' as well. Only published articles will show up in Algolia and in the frontend.

### Enable login as a user

> Login will work just fine without this step. However, the account will be verified by default, without any confirmation of the email address. This step will enable email confirmation as well as password reset using a 'forgot password' email.

To login or sign up as a user in the frontend, you'll have to setup [Sendgrid](https://sendgrid.com). This will enable the 'confirm email' and 'reset password' functionality. You can find the login credentials for the To The Root Sendgrid account in the [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/262146/Accounts).

1. Go to the [Strapi admin panel](http://localhost:1337/admin/)
2. Go to _Settings > Advanced Settings_ and set 'Enable email confirmation' to 'ON', then save
3. Set the 'Reset password page' to _http://localhost:3000/password/reset_
4. Set the 'Redirection url' to _http://localhost:3000_
5. Go to _Settings > Email Templates > Email address confirmation_ and set the 'Shipper email' to _totherootdev@gmail.com_
6. Go to _Settings > Email Templates > Reset password_ and set the 'Shipper email' to _totherootdev@gmail.com_
7. Go to _Settings > Roles > Public_ and under _Permissions_, expand the _User-Permissions_ drop down and enable 'forgotpassword' and 'resetpassword', then save
8. In your backend .env, set the SENDGRID_API_KEY. You can find it in the [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/53215239/.env+variables)
9. Terminate your frontend Nuxt server and run `npm run dev` again for the changes to take effect (_.env_ changes always require a rebuild)

This is temporary as we'd need to upgrade to a domain instead of a single sender in the future.

### Locally test login with GitHub

> This does not work at the moment. It used to work with [ngrok](https://ngrok.com), but due to updated safety blockages, this is not possible right now. It does work outside the development enviroment however, just not locally.

### Sending emails

To enable signing up to mailing lists (on /open-source, /contribute or /discord) or sending a contact request using the contact form, you will have to setup [EmailJS](https://www.emailjs.com).

1. In your frontend .env, set the EMAILJS_SERVICE_ID (see [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/53215239/.env+variables)).
2. In your frontend .env, set the EMAILJS_USER_ID (see [Project Pages on Confluence](https://one-community.atlassian.net/wiki/spaces/OC/pages/53215239/.env+variables)).
3. Terminate your frontend Nuxt server and run `npm run dev` again for the changes to take effect (_.env_ changes always require a rebuild)

## Common problems

### It just doesn't work

Have you tried rebuilding your frontend and backend server?

### I get a 403 (Forbidden)

Take a look at _More on permissions_. You probably have to change your permissions in Strapi.

### I can't see my article in the front end, but I see it in Strapi

Did you _publish_ it in Strapi? See _Creating your own articles, step 5_.

### I can't add a picture to my article (internal server error)

Make sure you have an "uploads" folder in the public map. See _Creating your own articles, step 1_.

### My Algolia index is not searchable

Did you create searchable attributes in Algolia for your index? See _Algolia (yes, again)_.