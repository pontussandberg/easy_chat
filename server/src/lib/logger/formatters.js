const logger = require('./index')

const logRequest = req => {
    const body = req.body || ''
    logger.info({
        message: 'Request from client',
        method: req.method,
        path: req.url,
        body,
        timestamp: true,
    })
}

const logResponse = (req, responseData, statusCode) => {
    const body = req.body || ''
    logger.info({
        message: 'Response from server',
        responseData,
        statusCode,
        request: {
            method: req.method,
            path: req.url,
            body,
        },
        timestamp: true,
    })
}

const logDbError = err => {
    logger.error({
        error: err,
        message: 'Problem with connection to DB',
        timestamp: true,
    })
}

module.exports = {
    logRequest,
    logDbError,
    logResponse,
}
