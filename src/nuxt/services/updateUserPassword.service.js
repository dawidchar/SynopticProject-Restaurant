import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'

export default async ({ $store, $auth }, data) => {
    const userEmail = $store.state.user.userData?.email
    const currentUser = $auth?.currentUser

    if (!userEmail || !currentUser) { return Promise.reject(new Error("User Not Signed In, Can't update user password")) }

    const cred = EmailAuthProvider.credential(userEmail, data.currentPassword)

    await reauthenticateWithCredential(currentUser, cred)
    await updatePassword(currentUser, data.newPassword)
}
