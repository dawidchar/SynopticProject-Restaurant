require('dotenv').config()
const dayjs = require('dayjs')
const chalk = require('chalk')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const authenticatedMiddleware = require('./middleware/authenticated')
const { postBooking } = require('./services/booking.js')
const { postOrder } = require('./services/order.js')

const isDev = process.env.NODE_ENV !== 'production'

// ---- Firebase Setup ---- //
try {
    admin.initializeApp();
} catch (e) {
    console.error(chalk.red.bold.underline('Failed to Initialize Admin SDK -'), e.message)
    if (isDev) { throw error }
    process.exit(1)
}

const db = admin.firestore()
const auth = admin.auth()


// ---- Express Setup ---- //
const app = express()
const PORT = process.env.PORT || isDev ? 3300 : 8080

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

// ---- App Setup ---- //
const context = {
    admin,
    app,
    db,
    auth,
    dayjs,
    dbTimestamp: admin.firestore.Timestamp,
    serverTimestamp: admin.firestore.FieldValue.serverTimestamp(),
    fieldIncrement: admin.firestore.FieldValue.increment
}

// ---- Express Routes ---- //

app.post('/booking', postBooking(context))
app.post('/order', authenticatedMiddleware(context), postOrder(context))
app.get('/ping', (req, res) => { res.send('pong') })

if (isDev) {
    app.listen(PORT)
}