const express = require('express')
const path = require('path')
const { users } = require('./routes/controllers')
const { requestsLogger } = require('./routes/middleware')

const app = express()

app.use(requestsLogger)
app.use(express.static(path.join(__dirname, '../../client/dist')))
app.use('/api/users', users)

module.exports = app
