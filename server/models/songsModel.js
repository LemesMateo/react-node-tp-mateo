const pool = require("../db")

const addSong = async (data) => {
    const query = "INSERT INTO song SET ?";
    try {
      return await pool.query(query, post)
    } catch (error) {
      error.message = error.code;
    }
};


async function editSong(data, id) {
    try {
      const query = "update song set ? where id = ?";
      const row = await pool.query(query, [data, id])
      return row;
    } catch (error) {
      console.log(error)
    }
};

const deleteSong = async (id) => {
    const query = "delete from song where id = ?";
    const row = await pool.query(query, [id]);
    return row;
};


module.exports = { addSong, editSong, deleteSong }