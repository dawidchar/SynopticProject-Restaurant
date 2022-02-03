import { deleteDoc } from 'firebase/firestore'

export default ({ $firestore }, payload) => {
    const docId = (typeof payload === 'string' ? payload : payload.id) || undefined

    if (!docId) { return Promise.reject(new Error('Item Doc Id Missing')) }

    return deleteDoc($firestore.doc.menuItem(docId))
}
