let express = require('express');
let app = express();
var passport = require("../config/passport");
let models = require('../../models');
let sequlize = require('sequelize');

module.exports = function(app) {

  app.get("/api/review", function(req, res) {
    
    let search;
    if(req.body.reviewType === "movie") {
      search = {
        movie_name: req.body.searchText
      }
    } else if(req.body.reviewType === "user") {
      search = {
        user_name: req.body.searchText
      }
    }

    models.Review.findAll({
      where: search
    }).then(function(result) {
      console.log(result);
      res.send('hello');
    })
  })

  app.post("/api/review",)

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
      });
    
      // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
      // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
      // otherwise send back an error
      app.post("/api/signup", function(req, res) {
        models.User.create({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        })
          .then(function() {
            res.redirect("index.html");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });
    
      // Route for logging user out
      app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });
    
      // Route for getting some data about our user to be used client side
      app.get("/api/user_data", function(req, res) {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
          // Otherwise send back the user's email and id
          // Sending back a password, even a hashed password, isn't a good idea
          res.json({
            email: req.user.email,
            name: req.user.name,
            id: req.user.id
          });
        }
        app.post('/api/users', async function (req, res) {

            const [user, created] = await models.User.findOrCreate({
                where: { username: req.body.username, name: req.body.name, password: req.body.password}
            });
            if (created) {
                res.send('Email already in use');
            }
        

    });

});
};



