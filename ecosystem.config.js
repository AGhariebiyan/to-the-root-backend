module.exports = {
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
