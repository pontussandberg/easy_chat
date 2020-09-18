const http = require('http')
const socketIO = require('socket.io');
const app = require('./app')
const socket = require('./lib/socket')
const { disconnectDB, connectDB } = require('./lib/db')
const { logDbError } = require('./lib/logger/formatters');

const server = http.createServer(app)
const io = socketIO(server)
io.on('connection', socket(io))

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`listening on port: ${port}`))

connectDB()
    .catch(err => logDbError(err))

const terminate = () => {
    Object.values(io.sockets.sockets).forEach(socket => socket.disconnect())
    server.close(() => {
        disconnectDB(() => {
            process.exit(0)
        })
    })
}

process.on('SIGTERM', terminate)
process.on('SIGINT', terminate)
