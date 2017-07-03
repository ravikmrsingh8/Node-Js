const {MongoClient} = require('mongodb');

var url = 'mongodb://127.0.0.1:27017/TodoDB';
MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log("Couldn't connect to Server");
    }
    console.log("Connected to MongoDB Server");

    db.collection("Todos").insertOne({
        text: 'Eat Lunch',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log("Error Occurred");
        }
        console.log(format(result.ops));
    });

});

var format = (obj) => {
    return JSON.stringify(obj, undefined, 4);
};