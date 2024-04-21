const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/todo";

mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connection established");
});

db.on('disconnected', () => {
    console.log("MongoDB connection disconnected");
});

db.on('error', (error) => {
    console.log("Error in MongoDB connection", error);
});

module.exports = db;