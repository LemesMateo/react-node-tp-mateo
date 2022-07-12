const {createPool} = require("mysql");
const util = require("util");

const pool = createPool({
    connectionLimit: 10,
    host: 'localhost',
    database: 'rocklyrics',
    user: 'root',
    password: '',
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
