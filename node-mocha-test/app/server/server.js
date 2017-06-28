const express = require('express');
var app = express();

app.get('/', (req, resp) =>{
    resp.status(404).send({
        error: 'Page not found.',
        name: 'Todo App V1.0'
    });
});

app.get('/users', (req, resp) =>{
    var users = [{
        name: 'Ravi',
        age: 29
    }, {
        name: 'Mohit',
        age: 27
    }, {
        name: 'Gokern',
        age: 28
    }];
    resp.status(200).send(users);
});
app.listen(3000, () => {
    console.log("server started at 3000");
});


module.exports.app = app;