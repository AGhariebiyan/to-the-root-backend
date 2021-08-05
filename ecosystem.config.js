module.exports = {
  apps: [
    {
      name: "one-community-fe",
      cwd: "./one-community",
      script: "npm",
      args: "dev",
    },
    {
      name: "strapi",
      cwd: "./one-community-backend",
      script: "npm",
      args: "develop",
    },
  ],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
}
