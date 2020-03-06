let express = require('express');
let app = express();
let models = require('../models');
let sequlize = require('sequelize');
app.post('/api/users', function (req, res) {
    const [user, created] = await models.User.findOrCreate({
        where: { username: req.body.username, password: req.body.password}
    });
    if (created) {
        res.send('Email already in use');
    }

});