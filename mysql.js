const { createPool } = require('mysql');

module.exports = (createPool => () => 
        createPool({
        user: "root",
        password: "",
        host: "localhost",
        database: "test",
        port: 3306,
        connectionLimit: 10
    })

)(createPool);