var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    // Displays home page with form
    res.sendFile(__dirname + "/" + "frontend.html");
})

app.post('/verify_palindrome', urlencodedParser, function (req, res) {
    // Receives string and checks if it is palindrome.
    // Returns JSON with answer

    // 'string' is the provided word or sentence to test
    let string = req.body.string;

    // Returns 200 if it is palindrome, 400 otherwise.
    isPalindrome(string) ? res.status(200) : res.status(400);

    res.setHeader('Content-Type', 'text/plain');
    res.end('');
})

function isPalindrome(string) {
    // Checks if the string is palindrome.

    // Normalizes to lowercase & removes non-alphanumeric characters.
    string = string.toLowerCase();
    string = string.replace(/\W/g, '');

    let len = string.length;
    if (len==0) return false;

    // Outside-in checking of characters. 
    for (let i = 0; i < len; i++) {
        if (string[i] != string[len-1-i]) return false;
    };
    return true;
}

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)
})