'use strict'

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const _ = require('lodash')
const { sanitizeEntity } = require('strapi-utils')
const {
  transformUserForProfilePage,
  getUserId,
  userFieldsToIgnoreOnUpdate,
} = require('../services/sanitize-user')

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  })

const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
]

module.exports = {
  async retrieveUserIds() {
    const queryResult = await strapi.query('user', 'users-permissions').find()
    const users = queryResult.map((user) => sanitizeUser(getUserId(user)))
    return users
  },

  async retrieveUser(ctx) {
    const { id } = ctx.params

    if (id == 'me') {
      return sanitizeUser(ctx.state.user)
    }

    const user = await strapi.query('user', 'users-permissions').findOne({ id })
    const transformed = transformUserForProfilePage(user)
    console.log("san:", transformed);
    return sanitizeUser(transformUserForProfilePage(user))
  },

  /**
   * This code was mainly copied from https://github.com/strapi/strapi/blob/v3.0.0/packages/strapi-plugin-users-permissions/controllers/User.js
   * This is done in https://www.youtube.com/watch?v=ITk-pYtOCnQ
   * Note that it is an old version of Strapi (3.0.0)
   * 03-02-22 JM
   */

  /**
   * Retrieve user records.
   * @return {Object|Array}
   */
  async updateMe(ctx) {
    const advancedConfigs = await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced',
      })
      .get()

    const { id } = ctx.state.user
    const { email, username, password } = ctx.request.body

    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    })

    if (_.has(ctx.request.body, 'email') && !email) {
      return ctx.badRequest('email.notNull')
    }

    if (_.has(ctx.request.body, 'username') && !username) {
      return ctx.badRequest('username.notNull')
    }

    if (
      _.has(ctx.request.body, 'password') &&
      !password &&
      user.provider === 'local'
    ) {
      return ctx.badRequest('password.notNull')
    }

    if (_.has(ctx.request.body, 'username')) {
      const userWithSameUsername = await strapi
        .query('user', 'users-permissions')
        .findOne({ username })

      if (userWithSameUsername && userWithSameUsername.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.username.taken',
            message: 'username.alreadyTaken.',
            field: ['username'],
          }),
        )
      }
    }

    if (_.has(ctx.request.body, 'email') && advancedConfigs.unique_email) {
      const userWithSameEmail = await strapi
        .query('user', 'users-permissions')
        .findOne({ email })

      if (userWithSameEmail && userWithSameEmail.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.email.taken',
            message: 'Email already taken',
            field: ['email'],
          }),
        )
      }
    }

    let updateData = Object.entries(ctx.request.body).reduce((body, entry) => {
      const [key, value] = entry
      if (userFieldsToIgnoreOnUpdate.includes(key)) {
        return body
      }
      body[key] = value
      return body
    }, {})

    if (_.has(ctx.request.body, 'password') && password === user.password) {
      delete updateData.password
    }

    const data = await strapi.plugins['users-permissions'].services.user.edit(
      { id },
      updateData,
    )

    ctx.send(sanitizeUser(data))
  },
}
