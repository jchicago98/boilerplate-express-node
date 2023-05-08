require('dotenv').config();

let express = require('express');
let app = express();
var bodyParser = require("body-parser");

/**
 * Console logs Hello World in the terminal / CMD prompt
 */
console.log('Hello World');

/**
 * GET request that sends a response message of Hello World to the client
 */
app.get("/", (req, res) => {
    res.send('Hello Express');
});

/**
 * Absolute file path for the directory you want to use
 */
absolutePath = __dirname + '/views/index.html';

/**
 * GET request that sends a file as response type with absolute file path
 */
app.get("/", (req, res) => {
    res.sendFile(absolutePath);
})

/**
 * Absolute Path for directory with /public
 */
absolutePath = __dirname + '/public';

/**
 * Sets up a middleware function that serves static files from a directory
 * named "public" when the client makes a request to the URL path "/public". 
 * This is useful for serving things like images, CSS files, or JavaScript 
 * files that are used by the web pages in the application.
 */
app.use("/public", express.static(__dirname + '/public'));

/**
 * GET request with route /json that serves a response type json with a message body.
 */
app.get("/json", (req, res) => {
    res.json({
        message: "Hello json"
    });
});

/**
 * GET request with route /json that serves a response type json with a message body.
 */
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        //response = "Hello World".toUpperCase();
        res.json({
            message: "Hello json".toUpperCase()
        });
    } else {
        res.json({
            message: "Hello json"
        });
    }
})

/**
 * This middleware function logs information about incoming HTTP requests to the console. 
 * Specifically, it outputs a string containing the HTTP method, URL path, 
 * and IP address of the client making the request.
 */
app.use(function (req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});

/**
 * GET request with route /now that stores the current time in the variable req.time and
 * sends the response back to the user as a message type time property. This is a chain
 * function where next() invokes the next chain function.
 */
app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({
        time: req.time
    });
});

/**
 * GET request with the path variable 'word' that be used to get the route params. This
 * request returns a json response with property echo and the body being the params word. 
 * Example how to use this: http://localhost:3000/example-word-123/echo 
 * This should send back { "echo" : "example-word-123"}
 */
app.get("/:word/echo", function (req, res) {
    res.json({
        echo: req.params.word
    })
});

/**
 * GET request with route name. The response is of type json and queries the route params
 * and looks for variables first and last in the route. Example route looks like this:
 * http://localhost:3000/name?first=firstname&last=lastname
 */
app.get("/name", (req, res) => {
    res.json({
        name: req.query.first + " " + req.query.last
    })
});

/**
 * This middleware function parses incoming requests with URL-encoded payloads and 
 * is based on the body-parser package. Specifically, it takes the URL-encoded data from the 
 * HTTP request body and adds it to the req.body object as key-value pairs. 
 * The extended option determines whether to parse the URL-encoded data with the querystring 
 * library (when false) or the qs library (when true).
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * This middleware function parses incoming requests with JSON payloads 
 * and is also based on the body-parser package. Specifically, it takes 
 * the JSON data from the HTTP request body and adds it to the req.body object.
 */
app.use(bodyParser.json());

/**
 * This route handler handles a POST request to the /name route and 
 * expects data in the request body in the form of a first and last name. 
 * Specifically, it takes the data from the request body and logs the first name to the console. 
 * Then, it creates a JSON object with a concatenated full name (first + last) and 
 * sends it back as the response.
 */
app.post("/name", (req, res) => {
    console.log(req.body.first)
    res.json({
        name: req.body.first + " " + req.body.last
    })
})





























module.exports = app;
