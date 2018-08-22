const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./api/database/db_connection').dbConnect('dev');
const router = require('./api/routes/PeopleRoutes');



router(app);

app.listen(port);


console.log('Server started on: ' + port);