const express = require ('express');
const app = express();
let port = process.env.PORT || 8080;

app.listen(port);


console.log('Server started on: ' + port);