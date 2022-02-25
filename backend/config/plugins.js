module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'totherootdev@gmail.com',
      defaultReplyTo: 'totherootdev@gmail.com',
      testAddress: 'yourname@ordina.nl',
    },
  },
  // ...
});
