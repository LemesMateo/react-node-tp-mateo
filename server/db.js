const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'rocklyrics',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
});

pool.getConnection((err, connection) => {
    if (err) console.warn("No conectado", { "Error": err.message })
    else {
        console.dir("Conexión establecida...")
        pool.releaseConnection(connection)
    }
})

pool.query = util.promisify(pool.query);
module.exports = pool;
