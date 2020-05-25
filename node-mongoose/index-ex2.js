const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect.then(db => {
	console.log('Connected correctly to server');

	Dishes.create({
		name: "Doner123ka",
		description: "Turkish food made of meat and stuff"
	})
	.then(dish => {
		console.log(dish);

		return Dishes.findByIdAndUpdate(dish._id, {
			$set: {description: 'Updated new dish'}
		}, {
			new: true
		});
	})
	.then(dish => {
		console.log(dish);

		dish.comments.push({
			rating: 5,
			comment: "Very good. Excellent",
			author: 'Makhambet Torezhan'
		});

		return dish.save();
	}).then(dish => {
		console.log(dish);
		return Dishes.remove({});
	})
	.then(() => {
		return mongoose.connection.close();
	})
	.catch(err => {
		console.log(err);
	});
}).catch(err => {
	console.log('Could not find db');
});