
import FireStoreParser from 'firestore-parser'
import { firestoreRESTBuilder } from '~/config/endpoints'

const fetchFromFirestoreREST = ({ $axios, $authUser: { token: authToken } = {} }, resourcePath, isCollection, structuredQuery) => {
    if (authToken) {
        const usesQuery = !!structuredQuery

        const url = firestoreRESTBuilder(resourcePath)

        const config = {
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' }
        }

        const axiosMethod = usesQuery ? $axios.$post(url, structuredQuery, config) : $axios.$get(url, config)

        return axiosMethod.then((payload) => {
            if (isCollection) {
                if (!payload.documents && !Array.isArray(payload)) { return Promise.resolve([]) }

                const docs = (payload.documents || payload)
                const docData = doc => doc.fields || doc.document?.fields
                const docName = doc => doc.name || doc.document?.name

                return docs.filter(doc => !!docData(doc)).map(doc => ({ ...FireStoreParser(docData(doc)), id: docName(doc).split('/').pop() }))
            } else {
                return { ...FireStoreParser(payload.fields), id: payload.name.split('/').pop() }
            }
        }).catch(e => console.warn(`(SERVER) Failed to fetch resource: ${resourcePath} using Firestore REST API - ERROR:`, e.message))
    }
    return Promise.reject(new Error(`(SERVER) User Not Signed In - Failed to fetch resource: ${resourcePath}`))
}

export default fetchFromFirestoreREST
