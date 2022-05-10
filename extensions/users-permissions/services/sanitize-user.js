const userArticleFields = [
  'id',
  'name',
  'profile_picture',
  'username',
]

const userCommentFields = [
  'id',
  'name',
  'username',
]

const userEventFields = [
  'id',
  'name',
  'username',
]

const userProfileFields = [
  'articles',
  'biography',
  'display_email_on_profile',
  'email',
  'facebook',
  'github',
  'id',
  'is_ordina_employee',
  'linked_in',
  'name',
  'profile_picture',
  'specific_vacancy_site',
  'tagline',
  'twitter',
  'username',
  'website',
]

const userFieldsToIgnoreOnUpdate = [
  'articles',
  'blocked',
  'confirmed',
  'created_at',
  'is_ordina_employee',
  'provider',
  'role',
  'specific_vacancy_site',
]

const getUserId = (user) => {
  if (!user) return null

  return { id: user.id }
}

const transformUserForArticlePage = (user) => {
  if (!user) return null

  return userArticleFields.reduce((newUser, key) => {
    newUser[key] = user[key]
    return newUser
  }, {})
}

const transformUserForComments = (user) => {
  if (!user) return null

  return userCommentFields.reduce((newUser, key) => {
    newUser[key] = user[key]
    return newUser
  }, {})
}

const transformUserForEventPage = (user) => {
  if (!user) return null

  return userEventFields.reduce((newUser, key) => {
    newUser[key] = user[key]
    return newUser
  }, {})
}

const transformUserForProfilePage = (user) => {
  if (!user) return null

  const newUser = userProfileFields.reduce((_newUser, key) => {
    if (user[key]) {
      _newUser[key] = user[key]
    }
    return _newUser
  }, {})

  if (!user.display_email_on_profile) {
    delete newUser.email
  }

  return newUser
}

const transformUserForSettingsPage = (user) => {
  if (!user) return null

  const newUser = userProfileFields.reduce((_newUser, key) => {
    if (user[key]) {
      _newUser[key] = user[key]
    }
    return _newUser
  }, {})

  return newUser
}

module.exports = {
  getUserId,
  transformUserForArticlePage,
  transformUserForComments,
  transformUserForEventPage,
  transformUserForProfilePage,
  transformUserForSettingsPage,
  userFieldsToIgnoreOnUpdate,
}
