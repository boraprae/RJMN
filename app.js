const express = require("express");
const path = require("path");
const mysql = require("mysql");
const config = require('./dbConfig.js');
const bcrypt = require("bcrypt");
 
const app = express();
const con = mysql.createConnection(config);
 
//set "public" folder to be static folder, user can access it directly
app.use(express.static(path.join(__dirname, "js")))
app.use(express.static(path.join(__dirname, "css")))
app.use(express.static(path.join(__dirname, "images")))
app.use(express.static(path.join(__dirname, "img")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//or
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json()); 
 
// ============= Create hashed password ==============
app.get("/password/:pass", function (req, res) {
    const password = req.params.pass;
    const saltRounds = 10;    //the cost of encrypting see https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
    bcrypt.hash(password, saltRounds, function(err, hash) {
        //return hashed password, 60 characters
        // console.log(hash.length);
        res.send(hash);
    });
});
 
// ============= Login ==============
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
 
    const sql = `SELECT username, id FROM user WHERE username ='${username}' AND password='${password}'`;
    ;
    con.query(sql, [username, password], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
            return;
        }
        else {
            const numrows = result.length;
            //if that user is not unique
            if (numrows != 1) {
                //login failed
                res.status(401).end("Wrong username or password");
            }
            else {
                res.send("/");

                // console.log(result[0].password);
                //verify password, async method
                bcrypt.compare(password, result[0].password, function (err, resp) {
                    if (err) {
                        res.status(503).send("Authentication Server error");
                    }
                    else if (resp == true) {
                        //correct login send destination URL to client
                        res.send("e");
                    }
                    else {
                        //wrong password
                        res.status(401).send("Wrong password");
                    }
                });
            }
        }
    });
});
 
// ============= Page routes ==============
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/admindashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "./adminDashboard.html"))
});

app.get("/addpromotion", (req, res) => {
    res.sendFile(path.join(__dirname, "./adminMypromotion.html"))
});

app.get("/adminstatic", (req, res) => {
    res.sendFile(path.join(__dirname, "./adminBusinessInsight.html"))
});

app.get("/adminprofile", (req, res) => {
    res.sendFile(path.join(__dirname, "./profileAdmin.html"))
});

app.get("/explore", (req, res) => {
    res.sendFile(path.join(__dirname, "./explore.html"))
});

app.get("/findgroup", (req, res) => {
    res.sendFile(path.join(__dirname, "./Findsp.html"))
});

app.get("/contactus", (req, res) => {
    res.sendFile(path.join(__dirname, "./contactus.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./login.html"))
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./registerNew.html"))
});

app.get("/userindex", (req, res) => {
    res.sendFile(path.join(__dirname, "./indexafterlogin.html"))
});
 
app.get("/mypurchasestatus", (req, res) => {
    res.sendFile(path.join(__dirname, "./MyPurchaseStatus.html"))
});

app.get("/mypurchase", (req, res) => {
    res.sendFile(path.join(__dirname, "./MyPurchase.html"))
});
 //====== Start Server ======

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});
