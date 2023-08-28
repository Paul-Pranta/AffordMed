

const express = require("express");
const app = express();

const axios = require("axios");
const cors = require("cors");

app.use(
    cors(
        {
            credentials: true,
            origin:'http://localhost:5173'
        }
    )
)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const auth = async (req, res, next) => {
  const reqData = {
    companyName: "Train Info",
    clientID: "0feef93a-49c7-41fc-8efb-003cc1bd978c",
    ownerName: "paul",
    ownerEmail: "prantapaul200@gmail.com",
    rollNo: "20ETCS002095",
    clientSecret: "hTAmlfdkeDGEmMnh"
  };

  try {
    const response = await axios.post(
      "http://20.244.56.144/train/auth",
      reqData
    );
    const responseData = response.data; // Get the data from the response
    res.locals.authData = responseData; // Store auth data in res.locals
  } catch (error) {
    return res.status(500).json({ error: "Error occurred while authorizing" });
  }

  next();
};

app.get("/api/trains", auth, async (req, res) => {
    try {
      const authData = res.locals.authData; // Get auth data from res.locals
  
      const headers = {
        Authorization: `Bearer ${authData.access_token}`
      };
  
      const response = await axios.get("http://20.244.56.144/train/trains", {
        headers
      });
  
      const trainData = response.data; // Assuming the entire response is the train data
  
      if (!trainData) {
        return res.json({ error: "Error occurred while getting data" });
      }
  
      // Sort trains based on the specified criteria
      const sortedTrains = trainData.sort((a, b) => {
        if (a.price === b.price) {
          if (a.seatsAvailable.AC === b.seatsAvailable.AC) {
            const departureTimeA = a.departureTime.Hours * 60 + a.departureTime.Minutes + a.departureTime.Seconds / 60;
            const departureTimeB = b.departureTime.Hours * 60 + b.departureTime.Minutes + b.departureTime.Seconds / 60;
            return departureTimeB - departureTimeA; // Sort by departure time in descending order
          }
          return b.seatsAvailable.AC - a.seatsAvailable.AC; // Sort by AC seats in descending order
        }
        return a.price - b.price; // Sort by price in ascending order
      });
  
      res.json({ trains: sortedTrains });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  
  
  

app.get("/api/trains/:trainNo", auth, async (req, res) => { 
  try {
    const { trainNo } = req.params;

    const authData = res.locals.authData; 
    const headers = {
      Authorization: `Bearer ${authData.access_token}` 
    };

    const singleData = await axios.get(`http://20.244.56.144/train/trains/${trainNo}`, {
      headers
    });

    if (!singleData) {
      return res.json({ error: "Error occurred while getting train details" });
    }

    res.json(singleData.data);
  } catch (err) { 
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


