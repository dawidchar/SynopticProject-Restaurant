import { collection, doc, query, limit, orderBy, startAt, endAt, Timestamp } from 'firebase/firestore'

const firestoreCollectionRefs = ({ $db }) => {
    return {
        menu: collection($db, 'menu'),
        orders: collection($db, 'orders'),
        bookings: collection($db, 'bookings')
    }
}

const firestoreDocRefs = ({ $db }) => {
    return {
        user: uid => doc($db, 'users', uid),
        userBasket: uid => doc($db, 'basket', uid),
        menuItem: docId => doc($db, 'menu', docId)
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
            startAt(new Timestamp(start, 0)),
            endAt(new Timestamp(end, 0)),
            limit(50)
        )
    }
}

export default (context, inject) => {
    // Inject Firestore Collection & Document Refs
    inject('firestore', {
        collection: firestoreCollectionRefs(context),
        doc: firestoreDocRefs(context),
        query: firestoreQueries(context)
    })
}
