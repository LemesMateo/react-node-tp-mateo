"use strict";
const path = require("path");
const cors = require("cors")
const express = require("express")
const port = 5000
const musicModel = require("./models/musicModel")
const client = require("./db.js")
const app = express()


app.use(cors())
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

app.get("/api/artists", async (req, res) => {
    client.query(`select * from artist where name like '%${req.query.name}%' ORDER BY name LIMIT 10`, (err, result) => { 
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

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"))
})
app.listen(port, (err) => {
    console.log(err ? `Error: ${err}` : `Server up http://localhost:${port}`)
})