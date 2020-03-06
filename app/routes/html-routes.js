let express = require('express');
let app = express();
let path = require('path');
// let models = require('../models');
let sequlize = require('sequelize');
<<<<<<< HEAD:app/routes/html-routes.js

module.exports = function(app) {

=======
// index
app.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname, "public", "index.html")
    )
});
// signup
app.get('/signup', function (req, res) {
    return res.sendFile(path.join(__dirname, "public", "signup.html")
    )
});
>>>>>>> master:app/routes/html.routes.js
// watchlist
app.get('/watchlist', function (req, res) {
    return res.sendFile(path.join(__dirname, "public", "watchlist.html")
    )
});
//battle
app.get('/battle', function (req, res) {
    return res.sendFile(path.join(__dirname, "public", "battle.html")
    )
});

<<<<<<< HEAD:app/routes/html-routes.js
}
=======
>>>>>>> master:app/routes/html.routes.js
