import { getDocs } from 'firebase/firestore'
import fetchFromFirestoreREST from '~/services/fetchFromFirestoreRest'
import parseCollectionDocsSnapshot from '~/utils/parseCollectionDocsSnapshot'

export default (context) => {
    const { $firestore, store: { state } } = context

    if (process.client) {
        return getDocs($firestore.query.orders).then(snap => parseCollectionDocsSnapshot(snap))
    } else {
        return fetchFromFirestoreREST(context, `orders?orderBy=timestamp&pageSize=${state.admin_config.dataTable.showNumberOfLastOrders}`, true)
    }
}
