import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/data', function(req, res){
    //res.set("Access-Control-Allow-Origin", 'http://127.0.0.1:5500');
    res.json([
        {
            "text": "What a lovely day!",
            "profilePic": "images/tree-icon.png"
        },
        {
            "text": "Hey, how ya doing today?",
            "profilePic": "images/tree-icon.png"
        },
        {
            "text": "Sup.",
            "profilePic": "images/tree-icon.png"
        }
    ]);
});

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});