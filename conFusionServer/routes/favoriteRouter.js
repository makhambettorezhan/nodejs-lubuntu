const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Favorites = require('../models/favoriteRouter');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.get(authenticate.verifyUser, (req, res, next) => {
	Favorites.find({ user: req.user._id })
	.populate('user')
	.populate('dishes')
	.then(favorites => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.send(favorites);
	});
})

.post(authenticate.verifyUser, (req, res, next) => {
    Favorite.find({'user': req.user._id})
        .exec(function (err, favorites) {
            if (err) throw err;
            req.body.user = req.decoded._doc._id;

            if (favorites.length) {
                var favoriteAlreadyExist = false;
                if (favorites[0].dishes.length) {
                    for (var i = (favorites[0].dishes.length - 1); i >= 0; i--) {
                        favoriteAlreadyExist = favorites[0].dishes[i] == req.body._id;
                        if (favoriteAlreadyExist) break;
                    }
                }
                if (!favoriteAlreadyExist) {
                    favorites[0].dishes.push(req.body._id);
                    favorites[0].save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Um somethings up!');
                        res.json(favorite);
                    });
                } else {
                    console.log('Setup!');
                    res.json(favorites);
                }

            } else {

                Favorite.create({user: req.body.user}, function (err, favorite) {
                    if (err) throw err;
                    favorite.dishes.push(req.body._id);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Something is up!');
                        res.json(favorite);
                    });
                })
            }
    });
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Favorite.remove({'user': req.user._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
    .delete(authenticate.verifyUser, (req, res, next) => {

        Favorite.find({'user': req.user._id}, function (err, favorites) {
            if (err) return err;
            var favorite = favorites ? favorites[0] : null;

            if (favorite) {
                for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
                    if (favorite.dishes[i] == req.params.dishId) {
                        favorite.dishes.remove(req.params.dishId);
                    }
                }
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Here you go!');
                    res.json(favorite);
                });
            } else {
                console.log('No favourites!');
                res.json(favorite);
            }

        });
    });

module.exports = favoriteRouter;