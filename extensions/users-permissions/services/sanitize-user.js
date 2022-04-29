const userFrontendFields = [
  'username',
  'name',
  'biography',
  'profile_picture',
  'tagline',
  'github',
  'linked_in',
  'facebook',
  'twitter',
  'email',
  'website',
  'specific_vacancy_site',
  'is_ordina_employee',
  'articles',
  'id',
  'display_email_on_profile',
]

const getUserId = (user) => {
  if (!user) return null

  return { id: user.id }
}

const getFrontendFieldsUser = (user) => {
  if (!user) return null

  const newUser = userFrontendFields.reduce((_newUser, key) => {
    _newUser[key] = user[key]
    return _newUser
  }, {})

  if (!user.display_email_on_profile) {
    delete newUser.email
    return newUser
  }
}

module.exports = {
  getFrontendFieldsUser,
  getUserId,
}
