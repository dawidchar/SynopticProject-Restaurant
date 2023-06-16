import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth'
import firebaseConfig, { fireAuthHeader } from '~/config/firebase.config.js'

import getUserData from '~/utils/extractUserFromAuthUser'

// https://firebase.google.com/docs/auth/web/service-worker-sessions

initializeApp(firebaseConfig)

const auth = getAuth()

const getFirebaseUserPromise = () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()
            if (user) {
                getIdToken(user).then((idToken) => {
                    resolve({
                        ...getUserData(user),
                        token: idToken
                    })
                }, () => {
                    resolve(null)
                })
            } else {
                resolve(null)
            }
        })
    })
}

const fetchWithAuthorization = (original, firebaseUser) => {
    // Clone headers as request headers are immutable.
    const headers = new Headers()
    for (const entry of original.headers.entries()) {
        headers.append(entry[0], entry[1])
    }

    // Add ID token to header.
    headers.append(fireAuthHeader, JSON.stringify(firebaseUser))

    // Create authorized request
    const { url, ...props } = original.clone()
    const authorized = new Request(url, {
        ...props,
        mode: 'same-origin',
        redirect: 'manual',
        headers
    })

    return fetch(authorized)
}

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    const expectsHTML = event.request.headers.get('accept').includes('text/html')

    const isSameOrigin = self.location.origin === url.origin
    const isHttps = (self.location.protocol === 'https:' || self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1')

    // Only add fireauth token header to requests made to the server
    if (!expectsHTML || !isSameOrigin || !isHttps) {
        event.respondWith(fetch(event.request))

        return
    }

    event.respondWith(
        getFirebaseUserPromise().then(
            firebaseUser => firebaseUser
                ? fetchWithAuthorization(event.request, firebaseUser).catch(() => fetch(event.request))
                : fetch(event.request)
        )
    )
})

self.addEventListener('activate', (event) => {
    // eslint-disable-next-line no-undef
    event.waitUntil(clients.claim())
})
