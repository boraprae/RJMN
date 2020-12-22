const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
// ===== mysql =====
const mysql = require("mysql");
const config = require("./dbConfig.js");
const { password } = require("./dbConfig.js");
const con = mysql.createConnection(config);
// Middleware
app.use(express.static(path.join(__dirname, "css")))
app.use(express.static(path.join(__dirname, "css2")))
app.use(express.static(path.join(__dirname, "js")))
app.use(express.static(path.join(__dirname, "images")))
app.use(express.static(path.join(__dirname, "imagefindsp")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ====== Page route ======

app.get("/findshopper", function (req, res) {
    res.sendFile(path.join(__dirname, "./findshopper.html"));
});

app.get("/changepass", function (req, res) {
    res.sendFile(path.join(__dirname, "./changepass.html"));
});
app.get("/mypurchase", function (req, res) {
    res.sendFile(path.join(__dirname, "./mypurchase.html"));
});

app.get("/mypurchaseStatus", function (req, res) {
    res.sendFile(path.join(__dirname, "./mypurchasestatus.html"));
});

// ====== Login ======
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const sql = "SELECT username FROM user WHERE USERNAME=? AND PASSWORD=?";

    con.query(sql, [username, password], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).end("Server error");
            return;
        }

        // result is an array of records from database
        const numrows = result.length;
        //if no data
        if (numrows != 1) {
            res.status(401).end("Wrong username or password");
        }
        else {
            if (result[0].username == 'Orawan021') {
                res.send("/");
                console.log("Success")
            }
            else {
                res.send("/");
            }
        }
    });
});




// ====== Change Password ======
app.post("/changepass", function (req, res) {

    const oldpass = req.body.oldpass;
    const newpass = req.body.newpass;

    const sql = "UPDATE user SET password=? WHERE password=?";
    con.query(sql, [ newpass,oldpass], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).end("Server error");
        }
    });
});




// ====== Starting server ======
const port = 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
}); 