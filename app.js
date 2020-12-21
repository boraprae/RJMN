
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const config = require('./dbConfig.js');
const bcrypt = require("bcrypt");
 
const app = express();
const con = mysql.createConnection(config);
 
const e = require("express");
const { database, password } = require("./dbConfig.js");

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

 
// ============= Login ==============
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


 //---- register ----
app.post("/register", (req, res) => {
    const username = req.body.username;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const gender = req.body.gender;
    const password = req.body.password;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send("Hash error");
        } else {
            //get hashed password
            //insert to DB
            console.log(hash)
            const sql = 'INSERT INTO user (username, password, first_name, last_name, gender) VALUE (?, ?, ?, ?, ?)';

            con.query(sql, [username, password, first_name, last_name, gender], function (err, result) {
               
                if (err) {
                    console.log(err);
                    res.status(500).send("Database server error.");
                } else {
                    if (result.affectedRows == 1) {
                        res.send("New user has been added.");
                    } else {
                        res.status(501).send("Error while adding new user.");
                    }
                }
            });
        }
    })

});

//---- get owner ----
app.get("/user", (req, res) => {
    const sql = "SELECT username, password FROM user";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database server error");
        } else {
            res.json(result);
        }
    });
});
 
//=========== Set Password============
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

app.get("/changepass", function (req, res) {
    res.sendFile(path.join(__dirname, "./changepass.html"));
});

 //====== Start Server ======

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});
