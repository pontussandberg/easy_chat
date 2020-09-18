const { createUser, getUserBySocketID, deleteUserBySocketID } = require('../db/users')
const { emitConnectedUsers, emitLeaveMsg, emitJoinMsg, emitMsg } = require('./emiters')
const { inactiveTimeout } = require('../../../config')
const { handleDbErr } = require('./utils')

const inactiveTimers = {}
const setInactiveTimeout = socket => {
    inactiveTimers[socket.id] = setTimeout(() => {
        const message = 'has left the chat due to inactivity.'
        socket.emit('inactive')
        getUserBySocketID(socket.id)
            .then(user => emitLeaveMsg(user, socket, message))
            .then(() => socket.disconnect())
            .catch(handleDbErr(socket))
    }, inactiveTimeout)
}

module.exports = io => socket => {
    setInactiveTimeout(socket)

    socket.on('new_user', username => {
        createUser({ socketID: socket.id, username })
            .then(() => {
                emitConnectedUsers(io, socket)
                emitJoinMsg(username, socket)
            })
            .catch(handleDbErr(socket))
    })

    socket.on('out_chat_msg', content => {
        clearTimeout(inactiveTimers[socket.id])
        setInactiveTimeout(socket)
        getUserBySocketID(socket.id)
            .then(user => emitMsg(user.username, content, socket))
            .catch(handleDbErr(socket))
    })

    socket.on('disconnect', reason => {
        const message = reason !== 'server namespace disconnect'
            ? 'has left the chat.'
            : null

        getUserBySocketID(socket.id)
            .then(user => emitLeaveMsg(user, socket, message))
            .then(() => deleteUserBySocketID(socket.id))
            .then(() => emitConnectedUsers(io, socket))
            .catch(handleDbErr(socket))
    })
}
