const express = require ('express');
const app = express();
const bodyParser = require('body-parser');

port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const routes = require('./api/routes/PeopleRoutes');
routes(app);

app.listen(port);

console.log('Server started on: ' + port);