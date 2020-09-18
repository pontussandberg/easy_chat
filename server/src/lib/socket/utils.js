const { logDbError } = require('../logger/formatters')

const handleDbErr = socket => err => {
    socket.emit('server_error')
    socket.disconnect()
    logDbError(err)
}

module.exports = {
    handleDbErr,
}
