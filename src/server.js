const express = require('express');
const bodyParser = require('body-parser')
const sqlite3= require('sqlite3').verbose();
const path = require('path');
// Cors is required
const cors = require('cors');
const app = express();

// Cors Middleware
app.use(cors());
// Bodyparser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'build')));

// SQLITE3 Database
const db = new sqlite3.Database('./database.db', (error) => {
    if (error){
        console.log("Error opening database " + error.message);
    }else {
        console.log('Connected to in-memory SQlite database');
        const query = `DROP TABLE IF EXISTS messages`;
        db.run(query);
        db.run(
            `CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, message VARCHAR(20) NOT NULL)`
        )
}});

// POST API to messages database
app.post("/api/messages", (req, res) => {
    const query = `INSERT INTO messages (message) VALUES (?)`;
    const params = [req.body.message];
    db.run(query, params);
})

// POST API to clear messages database
app.post("/api/clear", (req, res) => {
    const query = `DELETE FROM messages`;
    db.run(query);
    const content= [];
    res.json(content);
})

// GET API of all messages in database
app.get('/api/messages', function (req, res) {
    const content= [];
    db.all(`SELECT * FROM messages`, function(err, row) {
        row.forEach((r) =>{
            content.push(r.message);
        })
        res.json(content);
    });
    //res.json(content);
});

// GET index.html at start
app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('App is listening on port 8080');