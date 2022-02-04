// Use the below line to force the use of production services when testing locally
// (Without the required service account auth tokens)

// If not set to true, when testing locally, features such as booking a table and
// placing an order will not work
const forceProductionEndpoints = false

const isDev = process.env.NODE_ENV !== 'production' && !forceProductionEndpoints

export default {
    api: isDev ? 'http://localhost:3300' : 'https://europe-west2-synoptic-project-restaurant.cloudfunctions.net/api'
}
