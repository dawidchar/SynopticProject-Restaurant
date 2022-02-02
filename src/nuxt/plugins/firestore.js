import { collection, doc, query, limit, orderBy, startAt, endAt, Timestamp } from 'firebase/firestore'

const firestoreCollectionRefs = ({ $db }) => {
    return {
        menu: collection($db, 'menu'),
        orders: collection($db, 'orders'),
        bookings: collection($db, 'bookings')
    }
}

const firestoreUserRefs = ({ $db }) => {
    return {
        user: uid => doc($db, 'users', uid)
    }
}

const firestoreQueries = (context) => {
    const { store: { state } } = context
    return {
        orders: query(firestoreCollectionRefs(context).orders,
            orderBy('timestamp'),
            limit(state.admin_config.dataTable.ordersPerPage)),
        bookingsBetween: (start, end) => query(firestoreCollectionRefs(context).bookings,
            orderBy('timestampStart'),
            startAt(new Timestamp(start)),
            endAt(new Timestamp(end)),
            limit(50)
        )
    }
}

export default (context, inject) => {
    // Inject Firestore Collection & Document Refs
    inject('firestore', {
        collection: firestoreCollectionRefs(context),
        doc: firestoreUserRefs(context),
        query: firestoreQueries(context)
    })
}
