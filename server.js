const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view_engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} - ${req.method} ${req.url}`;
    fs.appendFileSync('server.log',log + '\n');
    console.log(log);
    next();
});


// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to my website',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'Codezync About',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'An Error Occurred'
    });
});

app.listen(3000,()=>{
    console.log('server started')
});