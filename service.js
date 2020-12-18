//---------- import -----------
const express = require("express");
const multer = require("multer");
// const bcrypt = require('bcrypt');
const app = express();
const path = require("path");
const upload = require('./uploadConfig.js');

const bcrypt = require("bcrypt");

//---- mysql -----
const mysql = require("mysql");
const config = require("./dbConfig.js");
const e = require("express");
const { database, password } = require("./dbConfig.js");
const con = mysql.createConnection(config);

//middleware is .use
app.use(express.static(path.join(__dirname, "js")))
app.use(express.static(path.join(__dirname, "css")))
app.use(express.static(path.join(__dirname, "img")))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ****** Page Routes ******
// ----- root service -----
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "./test9.html"))
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

//login
app.post("/userlogin", (req, res) => {
    // console.log("test");
    // const { username, password } = req.body;
    const username = req.body.username;
    const password = req.body.password;

    if (username == 'Orawan021' && password == '6231302021') {
        res.send("/admindashboard");
        //console.log("Success")
    }
    else {
        res.send("/userindex");
    }

    // const sql = `SELECT username, password FROM user WHERE username='${username}' AND password='${password}'`;

    // con.query(sql, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send("Database server error");
    //     } else {
    //         if (username == 'Orawan021' && password == '6231302021') {
    //            res.send("/admindashboard") ;
    //            console.log("Success");
    //         }
    //         else {
    //             res.send("/userindex");
    //         }
    //     }
    // })

    console.log(username, password);

    // const sql = `SELECT username FROM user WHERE username='${username}' AND password='${password}'`;

    //    console.log(sql);
    // con.query(sql, function (err, result, field) {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send("Database server error");
    //     } else {
    //         }
    //     })
});

//---- register ----
app.post("/registers", (req, res) => {
    const username = req.body.username;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const gender = req.body.gender;
    const passworduser = req.body.passworduser;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send("Hash error");
        } else {
            //get hashed password
            //insert to DB
            console.log(hash)
            const sql = 'INSERT INTO user (username, first_name, last_name, gender, password ,email) VALUE (?, ?, ?, ?, ?, ?)';

            con.query(sql, [username, first_name, last_name, gender, hash, email], function (err, result) {

                if (err) {
                    console.log(err);
                    res.status(500).send("Database server error.");
                } else {
                    if (result.affectedRows == 1) {
                        res.send("New promotion has been added.");
                    } else {
                        res.status(501).send("Error while adding new user.");
                    }
                }
            });
        }
    })

});

//---- get user ----
app.get("/user", (req, res) => {
    const sql = "SELECT username, first_name, last_name, email, gender, password FROM user";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database server error");
        } else {
            res.json(result);
        }
    });
});



//---Get the promotion
app.get("/promotion", (req, res) => {
    const sql = "SELECT proCode, proName, peoplePerPro, oriPrice, salePrice, startDate, endDate, proDetail, proImg FROM promotion";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database server error");
        } else {
            res.json(result);
        }
    });
});


//check row in table for display at dashboard
app.get("/prolength", (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM promotion";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database server error");
        } else {
            // console.log(result);
            res.json(result);
        }
    });
});

app.get("/memberlength", (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM user";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database server error");
        } else {
            // console.log(result);
            res.json(result);
        }
    });
});

//Check current time
app.get("/currentDate", function (req, res) {
    const today = new Date().toLocaleDateString();
    res.status(200).send(today);
});

//test
app.get("/showImg", function (req, res) {
    const sql = "SELECT proImg FROM promotion WHERE proCode = 19";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database server error");
        } else {
            res.send(result);
        }
    });
});

//--- Add promotion -----
app.post("/addpromotions", function (req, res) {

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Upload error");
        } else {
            //upload data to database
            const proName = req.body.proName;
            const oriPrice = req.body.oriPrice;
            const salePrice = req.body.salePrice;
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const peoplePerPro = req.body.peoplePerPro;
            const proDetail = req.body.proDetail;
            const proImg = req.file.filename;

            console.log("New promotion: ", proName, oriPrice, salePrice, startDate, endDate, peoplePerPro, proDetail, proImg);

            const sql = `INSERT INTO promotion (proName, peoplePerPro, oriPrice, salePrice, startDate, endDate, proDetail, proImg) VALUE (?, ?, ?, ?, ?, ?, ?, ?)`;
            con.query(sql, [proName, peoplePerPro, oriPrice, salePrice, startDate, endDate, proDetail, proImg], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Database server error.");
                } else {
                    if (result.affectedRows == 1) {
                        res.send("New promotion has been added.");
                    } else {
                        res.status(501).send("Error while adding new user.");
                    }
                }
            });
        }
    })

});

//--start server--
const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("Server is running at " + PORT);
});
