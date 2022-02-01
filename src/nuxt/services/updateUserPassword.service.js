import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'

export default async ({ $store, $auth }, data) => {
    if (!data.currentPassword || !data.newPassword) { throw new Error('Missing Password Data ') }

    const userEmail = $store.state.user.userData?.email
    const currentUser = $auth?.currentUser

    if (!userEmail || !currentUser) { throw new Error('User not signed in, Missing User Data') }

    const cred = EmailAuthProvider.credential(userEmail, data.currentPassword)

    await reauthenticateWithCredential(currentUser, cred)
    await updatePassword(currentUser, data.newPassword)
}
