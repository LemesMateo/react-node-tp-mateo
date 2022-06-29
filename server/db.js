const {createPool} = require("mysql");
const util = require("util");

const pool = createPool({
    connectionLimit: 10,
    host: 'localhost',
    database: 'rocklyrics',
    user: 'root',
    password: '',
});


pool.query = util.promisify(pool.query);
module.exports = pool;
