# How to start the app

There are two folders:

1. frontend, with a Nuxt front end client
2. backend, with a strapi server instance

## Start from scratch

The situation: You just cloned the repo to your computer and want to get going. Here is what to do.

### Minimal setup

In the minimal setup, you can view the site and search for articles.

#### Backend

1. Start a terminal of your choice
2. cd into the backend folder
3. Copy the .env.example and rename the file to .env
4. Set the ALGOLIA_INDEX to 'dev_content'
5. Run `npm i`
6. Run `npm run develop` to start the Strapi server
7. A Strapi instance should start, serving the app on localhost:1337

#### Database

A small and basic database setup can be done by running `npm run seed-db` (still in the backend folder). This db is connected to Algolia index `dev_content`. Running it allows you to view the articles on the detail page (clicking on it).

The images of the articles won't work though. So for now, it is advised to [add your own articles](creating-your-own-articles).

#### Frontend

1. Cd into the frontend folder using your favourite terminal
2. Copy the .env.example and rename the file to .env
3. Set the ALGOLIA_INDEX to 'dev_content'
4. run `npm i`
5. run `npm run dev`
6. A nuxt server should start, serving the app on localhost:3000

### Creating your own articles

You can create your own content in Strapi.

1. Create a folder named "uploads" in backend/public. This is needed to upload images.
2. Go to localhost:1337 to access the server
3. Create an admin account and login
4. In Articles (top left) create an article (or more of course)

#### Add the articles to Algolia

1. Log in to Algolia using the credentials in the Project Pages in Jira using Google OAuth.
2. Create a new index and name it something you like. I named mine "joran_content"
3. Make sure that you set the correct searchable attributes and attributes for faceting for the search and filtering to work.
4. Copy the admin api key from Algolia
5. In backend/.env, change the ALGOLIA_INDEX to your new index from step 2 and add the ALGOLIA_ADMIN_KEY you copied in step 3
6. In backend/.env, change the ENVIRONMENT to 'production'
7. Make sure that in Strapi, you are allowed to create articles. Go to Settings > User & permissions plugin > Roles > Public and make sure the box for finding articles is ticked.
8. Run the script `npm run content-to-algolia`
9. If everything went well, change the ALGOLIA_INDEX in frontend/.env to your new index
10. Rebuild your frontend server with `npm run build`
11. You should see your articles in the content page now!

### Resetting login details

To enable resetting the password of a user, make sure to have the sendgrid_api key in your backend .env. You can find the key in the Jira Pages.

This is temporary as we'd need to upgrade to a domain instead of a single sender in the future.

## Common problems

### I can't add a picture to my article (internal server error)

Make sure you have an "uploads" folder in the public map.

### I can't see my article in the front end, but I see it in Strapi

Did you _publish_ it in Strapi?

### My Algolia index is not searchable

Did you create searchable attributes in Algolia for your index?

### It just doesn't work

Have you tried rebuilding your frontend and backend server?
