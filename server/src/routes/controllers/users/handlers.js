const { getAllUsers } = require('../../../lib/db/users')
const validateUsername = require('./validateUsername')
const { logDbError, logResponse } = require('../../../lib/logger/formatters')


const handleValidateUsername = (req, res) => {
    const { username } = req.params

    const respond = allUsernames => {
        const responseData = validateUsername(username, allUsernames)
        logResponse(req, responseData.data, responseData.statusCode)
        res.status(responseData.statusCode).json(responseData.data)
    }

    getAllUsers()
        .then(respond)
        .catch(err => {
            logDbError(err)
            res.status(500).end()
        })
}

module.exports = {
    handleValidateUsername,
}
