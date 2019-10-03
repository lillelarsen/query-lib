const bcrypt = require('bcryptjs');

exports.extrapolate = function (data) {
    const keys = [];
    const values = [];

    for (let i in data) {
        keys.push(`${i} = ?`);
        values.push(data[i]);
    }

    return { keys, values };
}

exports.extrapolateKeys = function (data) {
    const keys = [];

    for (let i in data) {
        keys.push(`${i}`);
    }

    return keys;
}

exports.encryptPassword = function(password) {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}