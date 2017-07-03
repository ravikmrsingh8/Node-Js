var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/TodoDB',{useMongoClient: true});

var ToDo = mongoose.model('ToDo', new Schema ({
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt : {
        type: Number
    }
}));


var cookDinner = new ToDo({
    text: 'Cook Dinner',
    completed: true,
    completedAt: new Date().getTime()
});

cookDinner.save().then((doc)=>{
    console.log("Saved "+ JSON.stringify(doc, undefined, 4));
}, (err)=> {
    console.log("Error: "+err);
});