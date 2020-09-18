const { getCol } = require('../index.js')

const createUser = user => getCol('users')
    .then(col => col.insertOne({ ...user }))

const getUserBySocketID = socketID => getCol('users')
    .then(col => col.findOne({ socketID }))

const deleteUserBySocketID = socketID => getCol('users')
    .then(col => col.deleteOne({ socketID }))

const getAllUsers = () => getCol('users')
    .then(col => col.find({}))
    .then(cursor => cursor.toArray())


module.exports = {
    createUser,
    getAllUsers,
    getUserBySocketID,
    deleteUserBySocketID,
}
