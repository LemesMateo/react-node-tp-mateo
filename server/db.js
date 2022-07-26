const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    database: "heroku_d754403b5e9753d",
    user: "b677b1b5fc94b5",
    password: "6c6653e0",
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

//mysql://b677b1b5fc94b5:6c6653e0@us-cdbr-east-06.cleardb.net/heroku_d754403b5e9753d?reconnect=true