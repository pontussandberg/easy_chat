const { logRequest } = require('../../lib/logger/formatters')

module.exports = (req, _, next) => {
    logRequest(req)
    next()
}
