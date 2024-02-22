// server.js (or index.js)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Define a schema for your package
const orderSchema = new mongoose.Schema({
    //   packid: String,
    //   packname: String,
    //   pprice: Number,
    //   pdescription: String,

    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "login",
    // },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    }

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order