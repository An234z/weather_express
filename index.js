const express = require('express')
const app = express()
const PORT = 3000;
const path = require("path")
const fetch = require("node-fetch")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const key = "c46f0197f31986c520841e3bffdf3ab4";

const getWeatherDataPromise = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
		.then(responce => {
			return responce.json()
		})
		.then(data => {
			let description = data.weather[0].description
			let city = data.name
			let temp = Math.round(parseFloat(data.main.temp)-273.15)
			let result = {
			 description : description,
			 city : city,
			 temp : temp
			}
			resolve(result)
		})
		.catch(error => {
			reject(error)
		})
	})
}

app.all("/", function(req, res){
			let city 
			if(req.method == "GET") {
				city = "Tartu"
				
		}
		if(req.method == "POST") {
			city = req.body.cityname
			}
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
   getWeatherDataPromise(url)
   .then(data => {
	res.render("index", data)
		      })
		})
		
	app.post("/", function(req, res){
		let city = req.body.cityname
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        getWeatherDataPromise(url)
		.then(data => {
			res.render("index", data)
			})
		})		


app.listen(PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port", PORT);
})
