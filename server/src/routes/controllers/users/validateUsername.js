const { usernameMaxLength, reservedUsernames } = require('../../../../config')

const isUsernameTaken = (username, allUsernames) => allUsernames.some(x => x.username === username)

module.exports = (username, allUsernames) => {
    if (isUsernameTaken(username, allUsernames)) {
        return {
            data: {
                valid: false,
                errorMsg: 'Username is already taken.',
                username,
            },
            statusCode: 400,
        }
    }

    if (reservedUsernames.some(x => x === username)) {
        return {
            data: {
                valid: false,
                errorMsg: 'The entered username is reserved.',
                username,
            },
            statusCode: 400,
        }
    }

    if (username.length > usernameMaxLength) {
        return {
            data: {
                valid: false,
                errorMsg: `Username can not be more than ${usernameMaxLength} charachters long.`,
                username,
            },
            statusCode: 400,
        }
    }

    const regex = /[!@#\-$'`%^&*(),.?":{}|<>]|\s/g
    if (regex.test(username)) {
        return {
            data: {
                valid: false,
                errorMsg: 'Username can not contain special charachters.',
                username,
            },
            statusCode: 400,
        }
    }
    return {
        data: {
            valid: true,
            errorMsg: '',
            username,
        },
        statusCode: 201,
    }
}
