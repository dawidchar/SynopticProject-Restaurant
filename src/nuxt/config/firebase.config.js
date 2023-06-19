let firebaseProdConfig

if (process.env.NODE_ENV === 'production') {
    try {
        firebaseProdConfig = require('./firebase-prod-config.json')
    } catch (error) { console.error(`Error Loading Prod Firebase Config - ${error.message}`) }
}

const config = firebaseProdConfig || {
    apiKey: 'AIzaSyAQfwi8gibNLkjm4NHG1R-MD4qFmxI3wYc',
    authDomain: 'synoptic-project-restaurant.firebaseapp.com',
    projectId: 'synoptic-project-restaurant',
    storageBucket: 'synoptic-project-restaurant.appspot.com',
    messagingSenderId: '133311551901',
    appId: '1:133311551901:web:2264499492217b822fb774'
}

export const fireAuthHeader = 'fireauth-user'

export const apiKey = config.apiKey
export const authDomain = config.authDomain
export const projectId = config.projectId
export const storageBucket = config.storageBucket
export const messagingSenderId = config.messagingSenderId
export const appId = config.appId

export default config
