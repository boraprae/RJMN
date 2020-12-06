//---------- import -----------
const express = require("express");
const bcrypt = require('bcrypt');
const app = express();
const path = require("path");
const multer = require("multer");

const upload = require('./uploadConfig.js');

// const bcrypt = require("bcrypt");

//---- mysql -----
const mysql = require("mysql");
const config = require("./dbConfig.js");
const e = require("express");
const { database, password } = require("./dbConfig.js");
const con = mysql.createConnection(config);

//middleware is .use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ****** Page Routes ******
// ----- root service -----
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

// ---- Upload file
app.post("/uploading", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Upload error");
        } else {
            res.send("Upload done!");
        }
    })
});

//--- Add promotion -----
app.post("/addpromotions", function (req, res) {

    // let proImg = JSON.parse(req.headers.proImg);
    // console.log(proImg);
    // let imageName = Data.now() + "_" + proImg.originalname;

    // const options = multer.diskStorage({

    //     destination: function (req, file, cb) {
    //         cb(null, "./imgupload/");
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, imageName);
    //     }

    // });

    // const upload = multer({ storage: options }).single("fileUpload");

    // module.exports = upload;

    // upload(req, res, function (err) {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send("Upload error");
    //     } else {
            //upload data to database
            const proCode = req.body.proCode;
            const proName = req.body.proName;
            const oriPrice = req.body.oriPrice;
            const salePrice = req.body.salePrice;
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const peoplePerPro = req.body.peoplePerPro;
            const proDetail = req.body.proDetail;
            // const proImg = req.file.proImg;

            console.log("New promotion: ", proCode, proName, oriPrice, salePrice, startDate, endDate, peoplePerPro, proDetail);

            const sql = 'INSERT INTO promotion (proCode, proName, peoplePerPro, oriPrice, salePrice, startDate, endDate, proDetail) VALUE (?, ?, ?, ?, ?, ?, ?, ?)';

            con.query(sql, [proCode, proName, peoplePerPro, oriPrice, salePrice, startDate, endDate, proDetail], function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Database server error.");
                } else {
                    if (result.affectedRows == 1) {
                        res.send("New promotion has been added.");
                    } else {
                        res.status(501).send("Error while adding new user.");
                    }

                    // res.send("New promotion has been added.");

                }
            });

    //     }
    // });
});

//--start server--
const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("Server is running at " + PORT);
});
