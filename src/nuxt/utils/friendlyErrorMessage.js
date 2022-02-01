const errorCodeLookup = {
    'auth/wrong-password': 'Incorrect Password',
    'auth/too-many-requests': 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
}

export default (e) => {
    let friendlyError
    if (e.code) {
        friendlyError = errorCodeLookup[e.code]
    }

    return friendlyError || e.message || ''
}
