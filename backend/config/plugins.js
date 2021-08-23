module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'aheadofchange.org@gmail.com',
      defaultReplyTo: 'aheadofchange.org@gmail.com',
      testAddress: 'yourname@ordina.nl',
    },
  },
  // ...
});
