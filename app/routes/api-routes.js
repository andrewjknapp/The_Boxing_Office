let express = require('express');
let app = express();
let models = require('../models');
app.post('/api/users', function (req, res) {
    const [user, created] = await models.User.findOrCreate({
        where: { username: req.body.username, name: req.body.name, password: req.body.password}
    });
    if (created) {
        res.send('Email already in use');
    }

});