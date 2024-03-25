const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let CollectedData = new Schema({
  patientID: { type: String, required: true },
  GAD7Score: { type: Number },
  encodedImages: { type: Array },
  //encoded audio will be stored in the form of base64 string
  encodedAudio: { type: String },
  //heart rate will be stored in the form of an array, 10 random values between 60 and 120
  heartRate: { type: Array },
  //blood pressure will be stored in the form of an array, 10 random values between 80 and 120
  bloodOxygen: { type: Array },
}, {
  collection: 'collectedData'
});
  

  module.exports = {
    CollectedData: mongoose.model('CollectedData', CollectedData),
  };
  
