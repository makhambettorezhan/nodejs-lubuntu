const MongoClient = require('mongodb').MongoClient;
const dboper=  require('./operations');
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

	assert.equal(err, null);

	console.log('Connected to server correctly');

	const db = client.db(dbname);
	dboper.insertDocument(db, { "name": "Piazza", "description": "dish for pizza"}, 'dishes', result => {
		console.log('Insert Document:\n', result.ops);

		dboper.findDocuments(db, 'dishes', docs => {
			console.log('Found Documents:\n', docs);

			dboper.updateDocument(db, {"name": "Piazza"}, {"description": "Updated Dish"}, 'dishes', result => {
				console.log("Updated Document:\n", result.result)
			
				dboper.findDocuments(db, 'dishes', docs => {
					console.log('Found Documents:\n', docs);

					db.dropCollection('dishes', result => {
						console.log('Dropped Collection:\n', result);

						client.close();
					});
				});
			});
		});
	});

/*
	const collection = db.collection('dishes');

	collection.insertOne({"name": "Hello", "description": "Yoyoyo"}, (err, result) => {
		assert.equal(err, null);

		console.log('After Insert');
		console.log(result.ops);

		collection.find({}).toArray((err, docs) => {
			assert.equal(err, null);

			console.log('Found:\n');
			console.log(docs);

			db.dropCollection('dishes', (err, result) => {
				assert.equal(err, null);

				client.close();
			});

		});
	});
*/
});