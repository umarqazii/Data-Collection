const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const { CollectedData } = require('./Models/Database');

require("dotenv").config();

app.use(cors());
app.use(express.json());
const upload = multer();

mongoose.connect('mongodb://127.0.0.1:27017/DataCollection', {});

// mongoose.connect(process.env.MONG_URI)
//   .then(() => console.log("MongoDB connection established successfully"))
//   .catch((err) => console.log(err));



let userID = '';
let GAD7Score = 0;
let encodedImages = [];
let encodedAudio = '';
let heartRate = [];
let bloodOxygen = [];

//function to generate random values for heart rate and blood oxygen
function generateRandomValues() {
  for (let i = 0; i < 10; i++) {
    heartRate.push(Math.floor(Math.random() * (120 - 60 + 1)) + 60);
    bloodOxygen.push(Math.floor(Math.random() * (120 - 80 + 1)) + 80);
  }
}


// ----------------------------------Login route (used to check if the person is registered)----------------------------------
app.post('/login', (req, res) => {
  try {
    userID = req.body;
    //store userID as patientID in the database
    const newCollectedData = new CollectedData({ patientID: userID });

    newCollectedData.save()
      .then(() => {
        res.status(200).json({ message: 'Login successful' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// ----------------------------------Store GAD7 Score----------------------------------

app.post('/gadScore', async (req, res) => {
  try {
    GAD7Score = req.body;
    generateRandomValues();
    // Querying the existing document with the patientID
    CollectedData.findOne({ patientID: userID })
      .then(collectedData => {
        if (collectedData) {
          // If the document exists, update the fields
          collectedData.GAD7Score = GAD7Score;
          collectedData.heartRate = heartRate;
          collectedData.bloodOxygen = bloodOxygen;

          // Save the updated document
          collectedData.save()
            .then(() => {
              res.status(200).json({ message: 'GAD7 Score added successfully' });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Internal Server Error' });
            });
        } else {
          res.status(404).json({ message: 'Patient not found' });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// ---------------------------------Storing all other values except images----------------------------------
app.post('/storeData', async (req, res) => {
  try {
    const newCollectedData = new CollectedData({
      patientID: userID,
      GAD7Score: GAD7Score,
      heartRate: heartRate,
      bloodOxygen: bloodOxygen
    });
    newCollectedData.save()
      .then(() => {
        res.status(200).json({ message: 'Data added successfully' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// ----------------------------------Storing Encoded Images----------------------------------

app.post('/savingImages', (req, res) => {
  const { encodedimages } = req.body;
  const newImages = new EncodedImages({ patientID: userID, encodedImages: encodedimages });
  newImages.save()
    .then(() => {
      res.status(200).json({ message: 'Images added successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

