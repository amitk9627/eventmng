const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()

const app = require('./app.js');


const ConnectDB = async () => {
    await mongoose.connect(process.env.MongoDbUrl)
};
ConnectDB()
    .then(() => console.log("Connected to Data base"))
    .catch((err) => console.log("Database not connected"));


app.listen(3000, () => {
    console.log("server is listening...");
})