const pool = require("../db")

const addArtist = async (data) => {
    try {
      const query = "insert into artist set ?";
      const row = await pool.query(query, [data]);
      return row;
    } catch (error) {
      console.log(error);
    }
};


async function editArtist(data, id) {
    try {
      const query = "update artist set ? where id = ?";
      const row = await pool.query(query, [data, id])
      return row;
    } catch (error) {
      console.log(error)
    }
};

const deleteArtist = async (id) => {
    const query = "delete from artist where id = ?";
    const row = await pool.query(query, [id]);
    return row;
};

module.exports = { addArtist, editArtist, deleteArtist }