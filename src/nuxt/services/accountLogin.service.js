import { signInWithEmailAndPassword } from 'firebase/auth'

export default ({ $auth }, data) => {
    return signInWithEmailAndPassword($auth, data.email, data.password)
}
