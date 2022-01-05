module.exports = {
  // This is a setup for a production environment
  // We need to run "npm run build" in the frontend folder before running "pm2 start"
  apps: [
    {
      name: "strapi",
      exec_mode: "cluster",
      instances: "all",
      script: "./backend/server.js",
      cwd: "./backend",
    },
    {
      name: "NuxtAppName",
      exec_mode: "cluster",
      instances: "all",
      script: "./frontend/node_modules/nuxt/bin/nuxt.js",
      args: "start",
      cwd: "./frontend",
    },
  ],
}
