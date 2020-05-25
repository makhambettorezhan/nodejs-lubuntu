const MongoClient = require('mongodb').MongoClient;
const dboper=  require('./oper-promise.js');
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then(client => {


	console.log('Connected to server correctly');

	const db = client.db(dbname);

	dboper.insertDocument(db, { "name": "Piazza", "description": "dish for pizza"}, 'dishes')
	.then( result => {
		console.log('Insert Document:\n', result.ops);

		return dboper.findDocuments(db, 'dishes');
	})	
	.then(docs => {
			console.log('Found Documents:\n', docs);

		return dboper.updateDocument(db, {"name": "Piazza"}, {"description": "Updated Dish"}, 'dishes');

	}).then(result => {
		
		console.log("Updated Document:\n", result.result)
			
		return dboper.findDocuments(db, 'dishes');
	}).then( docs => {
		
		console.log('Found Documents:\n', docs);

		return db.dropCollection('dishes');
	}).then( result => {
		console.log('Dropped Collection:\n', result);
		client.close();
	}).catch(err => console.log(err));
			
})
.catch(err => console.log(err));