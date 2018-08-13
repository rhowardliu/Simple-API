const express = require ('express');
const bodyParser = require('body-parser');

require('./api/database/MongoConnection');

const app = express();

port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



const routes = require('./api/routes/PeopleRoutes');

routes(app);

app.listen(port);

console.log('Server started on: ' + port);


app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
  