let express = require('express');
let app = express();

// console.log('Hello World');

// app.get("/",  (req, res)=> {
//     res.send('Hello Express');
// });

absolutePath = __dirname + '/views/index.html';

app.get("/", (req,res)=>{
    res.sendFile(absolutePath);
})

// absolutePath = __dirname + '/public';

app.use("/public", express.static(__dirname + '/public'));



































module.exports = app;
