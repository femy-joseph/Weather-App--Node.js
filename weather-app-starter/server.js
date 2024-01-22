const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "b276addda955876f4796ac10e80abee9";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  let weather;
  let errorm=null;
  try {
    const response = await axios.get(APIUrl);
    //console.log(response); 
    weather = response.data;
  } catch (error) {
    
    weather = null;
    errorm = "Error, Please try again";
    //console.log(error)
    
  }
  //console.log(" test weather: ",weather)
  //console.log(" test Error: ",errorm)
  
  // Render the index template with the weather data and error message
  res.render("index", { weather, errorm });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
