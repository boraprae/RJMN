//******Page Routes *****
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/homepage", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/findshopper", (req, res) => {
    res.sendFile(path.join(__dirname, "./Findsp.html"))
});

app.get("/explore", (req, res) => {
    res.sendFile(path.join(__dirname, "./explore.html"))
});

app.get("/detailpromo", (req, res) => {
    res.sendFile(path.join(__dirname, "./DetailP.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./login.html"))
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./Register.html"))
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "./Contact.html"))
});

app.get("/mypurchasestatus", (req, res) => {
    res.sendFile(path.join(__dirname, "./MyPurchaseStatus.html"))
});

app.get("/mypurchase", (req, res) => {
    res.sendFile(path.join(__dirname, "./MyPurchase.html"))
});

//--start server--
const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("Server is running at " + PORT);
});
