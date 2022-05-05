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

const transformUserForProfilePage = (user) => {
  if (!user) return null

  const newUser = userProfileFields.reduce((_newUser, key) => {
    _newUser[key] = user[key]
    return _newUser
  }, {})

  if (!user.display_email_on_profile) {
    delete newUser.email
    return newUser
  }
}

module.exports = {
  transformUserForProfilePage,
  getUserId,
  userFieldsToIgnoreOnUpdate,
}
