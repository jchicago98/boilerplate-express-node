require('dotenv').config();

let express = require('express');
let app = express();

// console.log('Hello World');

// app.get("/",  (req, res)=> {
//     res.send('Hello Express');
// });

absolutePath = __dirname + '/views/index.html';

app.get("/", (req, res) => {
    res.sendFile(absolutePath);
})

// absolutePath = __dirname + '/public';

// app.use("/public", express.static(__dirname + '/public'));

// app.get("/json", (req, res) => {
//     res.json({
//         message: "Hello json"
//     });
// });


// app.get("/json", (req, res) => {
//     if (process.env.MESSAGE_STYLE === "uppercase") {
//         //response = "Hello World".toUpperCase();
//         res.json({
//             message: "Hello json".toUpperCase()
//         });
//     } else {
//         res.json({
//             message: "Hello json"
//         });
//     }
// })

// app.use(function(req, res, next) {
//     var string = req.method + " " + req.path + " - " + req.ip;
//     console.log(string);
//     next();
// });

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({
        time: req.time
    });
});





























module.exports = app;
