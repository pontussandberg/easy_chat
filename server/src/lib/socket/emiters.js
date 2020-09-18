const { systemUsername } = require('../../../config')
const { getAllUsers } = require('../db/users')
const { handleDbErr } = require('./utils')

const emitConnectedUsers = (io, socket) => getAllUsers()
    .then(userObjects => userObjects.map(x => x.username))
    .then(usernames => io.emit('connected_users', usernames))
    .catch(handleDbErr(socket))


const emitLeaveMsg = (user, socket, message) => {
    if (!message) {
        return
    }
    const leaveMsg = `${user.username} ${message}`
    socket.broadcast.emit('inc_chat_msg', {
        content: leaveMsg,
        username: systemUsername,
    })
}

const emitJoinMsg = (username, socket) => {
    socket.broadcast.emit('inc_chat_msg', {
        content: `${username} has joined the chat.`,
        username: systemUsername,
    })
}

const emitMsg = (username, content, socket) => {
    socket.broadcast.emit('inc_chat_msg', {
        content,
        username,
    })
}

module.exports = {
    emitConnectedUsers,
    emitLeaveMsg,
    emitJoinMsg,
    emitMsg,
}
