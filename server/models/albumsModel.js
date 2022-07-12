const pool = require("../db");

const proximo = () => {
  pool.query(`select max(id) as ultimo from album`, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      let id = 0;
      if (result && result[0]?.ultimo) {
        id = result[0]?.ultimo;
      }
      return id + 1;
    }
  });
};

const addAlbum = async (data) => {
  try {
    let id = proximo();
    console.log(data, id);
    const query = "insert into album set ?";
    const row = pool.query(query, [{ ...data, id }]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

const editAlbum = async (data, id) => {
  try {
    const query = "update album set ? where id = ?";
    const row = await pool.query(query, [data, id]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

const deleteAlbum = async (id) => {
  const query = "delete from album where id = ?";
  const row = await pool.query(query, [id]);
  return row;
};

module.exports = { addAlbum, editAlbum, deleteAlbum };
