//const MongoClient = require('mongodb').MongoClient;
//Destructuring using ES6 Syntax
const {MongoClient, ObjectID} = require('mongodb');

var url = 'mongodb://127.0.0.1:27017/TodoDB';
MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log(err);
    }
    console.log("Connected to MongoDB Server");


    db.collection('Todos').find().toArray().then((docs)=>{
        console.log(`All Jobs: ${docs.length}`);
        docs.forEach((doc)=>{console.log(format(doc))});
    });


    db.collection('Todos').find({completed: false}).toArray().then((docs)=>{
        console.log(`Pending Jobs: ${docs.length}`);
        docs.forEach((doc)=>{console.log(format(doc))});
    })
});

var format = (obj) =>{
    return JSON.stringify(obj, undefined, 4);
};