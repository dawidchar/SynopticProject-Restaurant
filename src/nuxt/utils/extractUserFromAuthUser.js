export default (authUser) => {
    return {
        displayName: authUser.displayName,
        email: authUser.email,
        uid: authUser.uid,
        token: authUser.accessToken
    }
}
