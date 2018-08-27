const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 8080;
let env = process.env.NODE_ENV || 'dev';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./api/database/db_connection').dbConnect(env);
const router = require('./api/routes/PeopleRoutes');



router(app);

app.listen(port);


console.log('Server started on: ' + port);