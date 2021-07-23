module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "ea1e43b1c57ff8451f70975bfdd8f830"),
    },
  },
  url: env("URL"),
})
