const pool = require("../db");

const getArtists = async () => {
    try {
      const query = "select * from artist";
      const rows = await pool.query(query);
      return rows;
    } catch (error) {
      console.log(error);
    }
};

const getArtist = async (id) => {
    try {
      const query = "select * from artist where id =?";
      const row = await pool.query(query, [id]);
      return row;
    } catch (error) {
      console.log(error);
    }
  };
  
const addArtist = async (data) => {
  try {
    const query = "insert into artist set ?";
    const row = await pool.query(query, [data]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

const deleteArtist = async (id) => {
  const query = "delete from artist where id = ?";
  const row = await pool.query(query, [id]);
  return row;
};

async function updateArtist(data, id) {
  try {
    const query = "update artist set ? where id = ?";
    const row = await pool.query(query, [data, id])
    return row;
  } catch (error) {
    console.log(error)
  }
};

module.exports = {getArtists, getArtist, addArtist, deleteArtist, updateArtist}