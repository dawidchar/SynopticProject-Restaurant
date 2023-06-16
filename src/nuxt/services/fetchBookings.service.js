import { getDocs } from 'firebase/firestore'
import fetchFromFirestoreREST from '~/services/fetchFromFirestoreRest'
import parseCollectionDocsSnapshot from '~/utils/parseCollectionDocsSnapshot'

export default (context, start, end) => {
    const { $firestore } = context

    if (process.client) {
        return getDocs($firestore.query.bookingsBetween(start, end)).then(snap => parseCollectionDocsSnapshot(snap))
    } else {
        const structuredQuery = {
            structuredQuery: {
                from: [
                    {
                        collectionId: 'bookings'
                    }
                ],
                where: {
                    compositeFilter: {
                        op: 'AND',
                        filters: [
                            {
                                fieldFilter: {
                                    field: {
                                        fieldPath: 'timestampStart'
                                    },
                                    op: 'GREATER_THAN_OR_EQUAL',
                                    value: {
                                        timestampValue: new Date(start * 1000).toISOString()
                                    }
                                }
                            },
                            {
                                fieldFilter: {
                                    field: {
                                        fieldPath: 'timestampStart'
                                    },
                                    op: 'LESS_THAN_OR_EQUAL',
                                    value: {
                                        timestampValue: new Date(end * 1000).toISOString()
                                    }
                                }
                            }
                        ]
                    }
                },
                orderBy: [
                    {
                        field: {
                            fieldPath: 'timestampStart'
                        },
                        direction: 'ASCENDING'
                    }
                ],
                limit: 50
            }
        }
        return fetchFromFirestoreREST(context, ':runQuery', true, JSON.stringify(structuredQuery))
    }
}
