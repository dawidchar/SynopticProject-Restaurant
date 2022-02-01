const errorCodeLookup = {
    'auth/wrong-password': 'Incorrect Password',
    'auth/too-many-requests': 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
}

export default (e) => {
    const friendlyError = errorCodeLookup[e.code]
    return friendlyError || e.message || ''
}
