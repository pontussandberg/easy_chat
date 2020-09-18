const assert = require('assert')
const validateUsername = require('../src/routes/controllers/users/validateUsername')
const { reservedUsernames, usernameMaxLength } = require('../config')

const usernamesDB = [
    { username: 'PotatoFries' },
    { username: 'HelloWorld' },
]

const tooLongUsername = new Array(usernameMaxLength + 2).join('x')

describe('validateUsername', () => {
    it('should be valid', () => {
        const result = validateUsername('Jon', usernamesDB)
        assert.ok(result.data.valid)
    })
    it('Should be valid', () => {
        const result = validateUsername('jOnNaDoe', usernamesDB)
        assert.ok(result.data.valid)
    })
    it('Should be invalid due to special character', () => {
        const result = validateUsername('Jonna-Doe', usernamesDB)
        assert.strictEqual(result.data.valid, false)
    })
    it('Should be invalid due to whitespace', () => {
        const result = validateUsername('Jonna Doe', usernamesDB)
        assert.strictEqual(result.data.valid, false)
    })
    it('Should be invalid due to username already taken', () => {
        const result = validateUsername('HelloWorld', usernamesDB)
        assert.strictEqual(result.data.valid, false)
    })
    it('Should be invalid due to reserved username', () => {
        const result = validateUsername(reservedUsernames[0], usernamesDB)
        assert.strictEqual(result.data.valid, false)
    })
    it('Should be invalid due to too long username', () => {
        const result = validateUsername(tooLongUsername, usernamesDB)
        assert.strictEqual(result.data.valid, false)
    })
})
