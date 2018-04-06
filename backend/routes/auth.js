var express = require('express'),
    bodyPaser = require('body-parser'),
    passport = require('passport');


var router = express.Router();

var routes = function (User) {


    router.route('/login')
        .post(passport.authenticate('local'), function (req, res) {
            var _data = {
                _id: req.user._id,
                cash: req.user.cash,
                first: req.user.first,
                last: req.user.last
            }
            res.status(200).send(_data);
        });




    router.route('/register')
        .post(function (req, res) {
            var query = {
                username: req.body.username
            };
            User.find(query, function (err, user) {
                if (err) {
                    res.status(500).send(err);
                }
                if (user.length != 0) {
                    res.status(500).send({ message: "Username exists" });
                } else {
                    var new_user = new User(req.body);
                    new_user.save().then(function (_data) {
                        req.login(_data, function () {
                            var __data = {
                                _id: _data._id,
                                cash: _data.cash,
                                first: _data.first,
                                last: _data.last
                            }
                            res.status(200).send(__data);
                        });
                    });

                }
            })
        });

    router.route('/logout')
        .post(function (req, res) {
            req.logout();
            res.status(204).send();
        })





    router.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.status(401).send();
            };
            next();
        })
        .get(function (req, res) {
            if (req.user) {
                User.findById(req.user._id, function (err, __data) {
                    delete __data.username;
                    delete __data.password;
                    res.send(__data);
                })
            }
        })


    return router;
}

module.exports = routes;




