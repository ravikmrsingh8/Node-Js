const {MongoClient, ObjectID} = require('mongodb');
var url = 'mongodb://localhost:27017/TodoDB';

MongoClient.connect(url, (err, db)=>{
    if(err) {return console.log("Couldn't Connected to MongoDB Server");}
    console.log('Connected to MongoDB Server');

    db.collection('Todos').findOneAndUpdate({
            _id : new ObjectID('595a82f15f129a1550a0cae0')
        }, {
            $set :{
                completed: true
            }
        }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });

});