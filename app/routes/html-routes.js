let express = require('express');
let app = express();
let path = require('path');
// let models = require('../models');
let sequlize = require('sequelize');

module.exports = function(app) {

// watchlist
app.get('/watchlist', function (req, res) {
    return res.sendFile(path.join(__dirname, "public", "watchlist.html")
    )
});
app.get('/battle', function (req, res) {
    return res.sendFile(path.join(__dirname, "public", "battle.html")
    )
});

}