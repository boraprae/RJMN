const express = require("express");
const path = require("path");
const app = express();

// ===== mysql =====
const mysql = require("mysql");
const config = require("./dbConfig.js");
const con = mysql.createConnection(config);
// Middleware
app.use(express.static(path.join(__dirname, "css2")))  
app.use(express.static(path.join(__dirname, "js"))) 
app.use(express.static(path.join(__dirname, "images")))     
                                        
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// ====== Page route ======
// ====== Root service ======
app.get("/" ,function(req,res){
    res.sendFile(path.join(__dirname, "./changepass.html"));
});
app.get("/MyPurchase" ,function(req,res){
    res.sendFile(path.join(__dirname, "./MyPurchase.html"));
});
 
app.get("/MyPurchaseStatus" ,function(req,res){
    res.sendFile(path.join(__dirname, "./MyPurchaseStatus.html"));
});
// ====== Other route ======
app.post("/login",function(req,res){
    const {username,password} = req.body;
    const sql = `SELECT username, role FROM user WHERE username ='${username}' AND password='${password}'`;
    con.query(sql, function(err,result,field){
        if(err){
            console.log(err);
        res.status(500).send("Database server error");
        }
        else{
            if(result.length == 0 ){
                res.status(400).send("Wrong username or password");
            }
            else{
                // correct login
                // res.send("welcome");
                if(result[0].role == 1){
                    res.send("admin");
                }
                else {
                    res.send("user");
                }
            }
        }
        
    });
});

// ====== Starting server ======
const port = 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});