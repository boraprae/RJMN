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
app.use(express.static(path.join(__dirname, "css2")))
app.use(express.static(path.join(__dirname, "js")))
app.use(express.static(path.join(__dirname, "images")))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ====== Page route ======
// ====== Root service ======
app.get("/Changepass", function (req, res) {
    res.sendFile(path.join(__dirname, "./changepass.html"));
});
app.get("/MyPurchase", function (req, res) {
    res.sendFile(path.join(__dirname, "./MyPurchase.html"));
});

app.get("/MyPurchaseStatus", function (req, res) {
    res.sendFile(path.join(__dirname, "./MyPurchaseStatus.html"));
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