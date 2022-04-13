const getUserWithoutPii = (user) => {
    if (!user) return null

    if (!user.display_email_on_profile) {
        delete user.email;
        return user;
    }

    return user
}

module.exports = {
    getUserWithoutPii,
}