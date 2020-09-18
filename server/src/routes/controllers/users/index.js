const router = require('express').Router()
const { handleValidateUsername } = require('./handlers')

router.get('/validate/:username', handleValidateUsername)

module.exports = router
