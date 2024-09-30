const express = require('express')
const app = express()
const PORT = 3000;

const path = require("path")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", function (req, res) {
    res.render("index")
})

app.listen(PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port", PORT);
})
