let express = require('express');
let app = express();
var passport = require("../config/passport");
let models = require('../../models');
let sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = function(app) {

  app.get("/api/review/:id", function(req, res) {
    models.Review.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(response) {
      res.send(response);
    })
  })

  app.post("/api/review/request", function(req, res) {
    let search = {};
    if(req.body.reviewType === "movie") {
      search = {
        where: {
          movie_name: {
            [Op.like]: `%${req.body.searchText}%`
          }
        }
      }
    } else if(req.body.reviewType === "user") {
      search = {
        where: {
          user_name: req.body.searchText
        }
      }
    } else if (req.body.reviewType === 'all') {
      search = {}
    }

    models.Review.findAll(search).then(function(result) {
      res.send(result);
    })
  })

  //Takes object with movie_name, review title and text
  app.post("/api/review", function(req, res) {
    models.Review.create({
      userid: req.user.id,
      user_name: req.user.name,
      movie_name: req.body.movie_name,
      review_title: req.body.title,
      review_text: req.body.text
    }).then(function() {
      res.sendStatus(200);
    })
  })

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



