const {MongoClient} = require('mongodb');

var url = 'mongodb://localhost:27017/TodoDB';
MongoClient.connect(url, (err, db) =>{
    if(err) { return console.log("Couldn't connected to MongoDB Server");}
    console.log('Connected to Mongo DB Server');

    db.collection('Todos').deleteMany({completed: true}).then((result)=>{
        console.log("deleted Many");
    });

    db.collection('Todos').deleteOne({completed: false}).then((result)=>{
        console.log("Deleted One");
    });

    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log("Deleted "+JSON.stringify(result, undefined, 4));
    });
});