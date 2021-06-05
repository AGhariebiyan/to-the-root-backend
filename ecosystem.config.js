module.exports = {
  apps : [{
    name: "one-community-fe",
    script: 'cd one-community && npm run dev',
    watch: 'true'
  }, {
    name: "sanity-studio",
    script: 'cd sanity-studio && sanity start',
    watch: 'true'
  }],

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
};
