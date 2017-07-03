//const MongoClient = require('mongodb').MongoClient;
//Destructuring ES6 Syntax
const {MongoClient, ObjectID} = require('mongodb');

var url = 'mongodb://127.0.0.1:27017/TodoDB';
MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log(err);
    }
    console.log("Connected to MongoDB Server");
    db.close();
});