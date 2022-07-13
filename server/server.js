"use strict";
const path = require("path");
const cors = require("cors")
const express = require("express")
const port = 5000
const albumsModel = require("./models/albumsModel")
const artistsModel = require("./models/artistsModel")
const songsModel = require("./models/songsModel")
const client = require("./db.js")
const app = express()
const router = express.Router();
const loginRouter = require('./controllers/login')

app.use(cors())
app.use('/api/login', loginRouter)
app.use(express.static(path.resolve(__dirname, "../client/dist")))

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "../client/dist", "index.html")))
app.get("/api/songs", async (req, res) => {
    client.query(`select * from song where title like '%${req.query.title}%' ORDER BY rank DESC LIMIT 10`, (err, result) => { 
        if(err) {
            console.log(err.message);
        } else {
            res.send(result);
        }
    })
});

app.use("/api/users", require("./users/usersRoute"))

app.get("/api/songs/getByAlbumId", async (req, res) => {
    client.query(`select * from song where album_id = ${req.query.album_id}`, (err, result) => { 
        if(err) {
            console.log(err.message);
        } else {
            res.send(result);
        }
    })
});

app.get("/api/artists", async (req, res) => {
    client.query(`select * from artist where name like '%${req.query.name}%' ORDER BY name LIMIT 10`, (err, result) => { 
        if(err) {
            console.log(err.message);
        } else {
            res.send(result);
        }
    })   
});

app.get("/api/songs/getByArtistId", async (req, res) => {
    client.query(`select * from song where artist_id = ${req.query.artist_id}`, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.send(result);
        }
    })
});

app.get("/api/albums", async (req, res) => {
    client.query(`select * from album where title like '%${req.query.title}%' ORDER BY title LIMIT 10 `, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.send(result);
        }
    })
});

app.get("/api/albums/getById", async (req, res) => {
    client.query(`select * from album where id = '${req.query.id}'`, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            if (result.length == 0) return res.send({});
            res.send(result[0]);
        }
    })
});

app.get("/api/artists/getById", async (req, res) => {
    client.query(`select * from artist where id = '${req.query.id}'`, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            if (result.length == 0) return res.send({});
            res.send(result[0]);
        }
    })
});

app.get("/api/songs/getById", async (req, res) => {
    client.query(`select * from song where id = '${req.query.id}'`, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            if (result.length == 0) return res.send({});
            res.send(result[0]);
        }
    })
});


app.post("/api/albums/add", async (req, res) => {
    console.log("req:", req)
    await albumsModel.addAlbum(req.body);
});

router.put("/api/albums/edit", async (req, res) => {
    await albumsModel.editAlbum([...req.body, req.body.id]);    
});

router.delete("/api/albums/delete/:id", async (req, res) => {
    const id = req.params.id;
    client.query("delete from album where id = ?"), id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    
});

router.post("/api/artists/add", async (req, res) => {
    await artistsModel.addArtist({ ...req.body});
});
router.post("/api/artists/edit", async (req, res) => {
    await artistsModel.editArtist(...req.body, req.body.id);    
});

router.get("/api/artists/delete", async (req, res) => {
    await artistsModel.deleteArtist(req.query.id);
});

router.post("/api/songs/add", async (req, res) => {
    await songsModel.addSong({ ...req.body});
});
router.post("/api/songs/edit", async (req, res) => {
    await songsModel.editSong(...req.body, req.body.id);    
});

router.get("/api/songs/delete", async (req, res) => {
    await songsModel.deleteSong(req.query.id);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"))
})
app.listen(port, (err) => {
    console.log(err ? `Error: ${err}` : `Server up http://localhost:${port}`)
})