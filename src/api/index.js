require('dotenv').config()
const dayjs = require('dayjs')
const chalk = require('chalk')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('pino')({
    formatters: {
        level(label) {
            return { severity: label.toUpperCase() };
        }
    },
    messageKey: 'message',
    base: null, // No need for pid, hostname
    nestedKey: 'data',
    timestamp: () => `,"time":"${(new Date()).toISOString()}"`,
}).child({ enviroment: process.env.NODE_ENV })

const authenticatedMiddleware = require('./middleware/authenticated')
const { postBooking } = require('./services/booking.js')
const { postOrder } = require('./services/order.js')

const isDev = process.env.NODE_ENV !== 'production'

logger.warn({ test: 123 }, "TEST")

// ---- Firebase Setup ---- //
try {
    admin.initializeApp();
} catch (e) {
    logger.error(chalk.red.bold.underline(`Failed to Initialize Admin SDK - ${e.message}`))
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
    logger,
    dayjs,
    dbTimestamp: admin.firestore.Timestamp,
    serverTimestamp: admin.firestore.FieldValue.serverTimestamp(),
    fieldIncrement: admin.firestore.FieldValue.increment
}

// ---- Express Routes ---- //

app.post('/booking', postBooking(context))
app.post('/order', authenticatedMiddleware(context), postOrder(context))
app.use('/ping', (req, res) => { res.send('pong') })
app.use('*', (req, res) => { res.status(404).send('Nothing Here') })

if (isDev) {
    app.listen(PORT)
}

exports.api = app