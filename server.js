import express from 'express';
import fs from 'fs';
import data from './data.json' with {type: "json"};

const app = express();

app.use(express.json());
app.use(express.static('public'));

// when user logs in
app.post('/login', function(req, res){
    // hard coded user based on feedback
    const user = data["arthur@gmail.com"];
    // push data
    user.push(req.body);

    // save to file
    fs.writeFile(
        './data.json',
        JSON.stringify(posts),
        'utf-8',
        function(err) {
            if(err) console.log(err);
            else console.log("Data Written successfully");
    });
    
});

// when user make new account
app.post('/register', function(req, res){
    // hard coded user based on feedback
    const user = data["arthur@gmail.com"];
    // push data
    user.push(req.body);

    // save to file
    fs.writeFile(
        './data.json',
        JSON.stringify(posts),
        'utf-8',
        function(err) {
            if(err) console.log(err);
            else console.log("Data Written successfully");
    });
    
});

// get expenses for home page
app.get('/expenses', function(req, res){
    // hard coded user based on feedback
    const user = data["arthur@gmail.com"];
    // return expenses
    res.json(user.expenses);
});

// createing a new expense on home page
app.post('/expense', function(req, res){
    // hard coded user based on feedback
    const user = data["arthur@gmail.com"];
    // push data
    user.push(req.body);

    // save to file
    fs.writeFile(
        './data.json',
        JSON.stringify(posts),
        'utf-8',
        function(err) {
            if(err) console.log(err);
            else console.log("Data Written successfully");
    });
});

// getting user limits
app.get('/limit', function(req, res){
    // hard coded user
    const user = data["arthur@gmail.com"];
    // return limits
    res.json(user.limits)
});

// creating a limit
app.post('/limit', function(req, res){
    // hard coded user based on feedback
    const user = data["arthur@gmail.com"];
    // push data
    user.push(req.body);

    // save to file
    fs.writeFile(
        './data.json',
        JSON.stringify(posts),
        'utf-8',
        function(err) {
            if(err) console.log(err);
            else console.log("Data Written successfully");
    });
});


app.listen(3000, function(){
    console.log('Server listening on port 3000');
});