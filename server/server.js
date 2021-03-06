"use strict";
const path = require("path");
const cors = require("cors");
const express = require("express");
const port = 5000;
const songsModel = require("./models/songsModel");
const client = require("./db.js");
const app = express();
const router = express.Router();
const loginRouter = require("./controllers/login");
const isAuth = require("./middlewares/isAuth")

var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/login", loginRouter);
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"))
);
app.get("/api/songs", async (req, res) => {
  client.query(
    `select * from song where title like '%${req.query.title}%' ORDER BY rank DESC LIMIT 10`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

app.use("/api/users", require("./users/usersRoute"));

app.get("/api/songs/getByAlbumId", async (req, res) => {
  client.query(
    `select * from song where album_id = ${req.query.album_id}`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/artists", async (req, res) => {
  client.query(
    `select * from artist where name like '%${req.query.name}%' ORDER BY name LIMIT 10`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/songs/getByArtistId", async (req, res) => {
  client.query(
    `select * from song where artist_id = ${req.query.artist_id}`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/albums", async (req, res) => {
  client.query(
    `select * from album where title like '%${req.query.title}%' ORDER BY title LIMIT 10 `,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/albums/getById", async (req, res) => {
  client.query(
    `select * from album where id = '${req.query.id}'`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        if (result.length == 0) return res.send({});
        res.send(result[0]);
      }
    }
  );
});

app.get("/api/artists/getById", async (req, res) => {
  client.query(
    `select * from artist where id = '${req.query.id}'`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        if (result.length == 0) return res.send({});
        res.send(result[0]);
      }
    }
  );
});

app.get("/api/songs/getById", async (req, res) => {
  client.query(
    `select * from song where id = '${req.query.id}'`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        if (result.length == 0) return res.send({});
        res.send(result[0]);
      }
    }
  );
});


app.post("/api/songs/add", isAuth, async (req, res) => {
  const title = req.body.title;
  const type = 'track';
  const artist_id = req.body.artistId;
  const album_id = req.body.albumId;
  const lyrics = req.body.lyrics;

  client.query(
    `INSERT INTO song (title,type, artist_id, album_id, lyrics) VALUES (?,?,?,?,?)`,
    [
      title,
      type,
      artist_id,
      album_id,
      lyrics,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/api/songs/edit/:id", isAuth, (req, res) => {
  const id = req.params.id;
  const title = req.body.title.replace(/"/g, '');
  const lyrics = req.body.lyrics.replace(/"/g, '');
  client.query(
    `UPDATE song SET title="${title}", lyrics="${lyrics}" WHERE id="${id}"`,
    [title, lyrics, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* router.post("/api/songs/edit", async (req, res) => {
    await songsModel.editSong(...req.body, req.body.id);    
});
 */
app.delete("/api/songs/delete/:songId", isAuth, async (req, res) => {
  const id = req.params.songId;
  client.query("DELETE FROM song WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});
app.listen(port, (err) => {
  console.log(err ? `Error: ${err}` : `Server up http://localhost:${port}`);
});
