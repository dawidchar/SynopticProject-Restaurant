// Authentication Middleware
const authenticated = ({ auth }) => (req, res, next) => {
    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.sendStatus(403)
    }

    auth.verifyIdToken(accessToken).then((decodedToken) => {
        res.locals.user = decodedToken
        next()
    }).catch((e) => { return res.sendStatus(403) })
}

module.exports = authenticated