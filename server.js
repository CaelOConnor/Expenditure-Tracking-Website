import express from 'express';
import fs from 'fs';
import data from './data/data.json' with {type: "json"};

const app = express();

app.use(express.json());
app.use(express.static('public'));

// when user logs in
app.post('/login', function(req, res){
    // get email and password from request
    const {email, password} = req.body;
    // get user
    const user = data[email];

    // check if user exits and password matches
    if (user && user.password === password){
        res.json({success: true});
    } else {
        res.json({success: false});
    }  
});

// when user make new account
app.post('/register', function(req, res){
    // get data from request body 
    const {name, email, password} = req.body;
    // check if email already exists
    if (data[email]) {
        return res.json({success: false});
    }
    // create new user
    data[email] = {
        name: name,
        email: email,
        password: password,
        expenses: []
    };
    // save to file
    fs.writeFile(
        './data/data.json',
        JSON.stringify(data),
        'utf-8',
        function(err) {
            if(err) {
                console.log(err);
                return res.json({success: false});
            }
            res.json({success: true})
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
        './data/data.json',
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
        './data/data.json',
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