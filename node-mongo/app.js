const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbname = 'movies';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null);

	console.log('Connected to server correctly');

	const db = client.db(dbname);

	const collection = db.collection('popular');

	collection.insertOne({"name": "Avengers: Infinity War", "year": 2018}, (err, result) => {
		assert.equal(err, null);

		console.log(result.ops);
		//client.close();
	});

	db.dropCollection('popular', (err, result) => {
		assert.equal(err, null);

		console.log(result);
	});
});