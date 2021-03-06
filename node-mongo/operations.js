const assert = require('assert');

const insertDocument = (db, document, collection, callback) => {
	const coll = db.collection(collection);
	coll.insert(document, (err, result) => {
		assert.equal(err, null);
		console.log('Inserted ' + result.result.n + ' documents into the collection ' + collection);
		callback(result);
	});
};

const findDocuments = (db, collection, callback) => {
	const coll = db.collection(collection);
	coll.find({}).toArray((err, docs) => {
		assert.equal(err, null);
		callback(docs);
	});
};

const removeDocument = (db, document, collection, callback) => {
	const coll = db.collection(collection);
	coll.deleteOne(document, (err, result) => {
		assert.equal(err, null);
		console.log('Removed the document ' + document);
		callback(result);
	})
};

const updateDocument = (db, document, update, collection, callback) => {
	const coll = db.collection(collection);
	coll.updateOne(document, { $set: update }, null, (err, result) => {
		assert.equal(err, null);
		console.log("Updated the document", update);
		callback(result);
	});
};

module.exports = {
	insertDocument, 
	findDocuments,
	removeDocument,
	updateDocument
};