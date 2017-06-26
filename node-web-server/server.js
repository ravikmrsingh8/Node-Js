const express = require('express');
const fs = require('fs');
//configure handlebars
const hbs = require('hbs');

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});


//configure express
let app = express();
app.set('view engine', 'hbs');

//middle-wares
//intercept all request
app.use((request, response, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url} ${request.ip}`;

    var maintenance = Math.floor(Math.random() + 0.5);
    if( maintenance) {
        log += "[Maintenance Mode]";
        response.render('maintenance.hbs');
    }
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err) console.log("Couldn't save log on file");
    });

    if(!maintenance) next();

});

//serve public directory
app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {
   response.render('home.hbs', {
       title: 'Home Page',
       welcomeText: 'Welcome to my website'
   });
});
app.get('/about',(request, response)=>{
    response.render('about.hbs', {
        title: 'About Page'
    });
});
app.get('/bad',(request, response)=>{
    response.send({error:'Something Unexpected occured'});
});

app.listen(3000, () => {
    console.log('Server up on 3000\nListening for requests..');
});

