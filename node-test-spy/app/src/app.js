var db = require('./db');
//Notice the var db declaration, test would fail,if you change this to const
//I'm guessing the rewire module mutates the variables of imported modules while running test

module.exports.handleSignUp = (email, password) => {
    //check duplicate email
    //save user
    db.saveUser({email, password});
    //send confirmation mail
};

