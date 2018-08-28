const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = require('./api/routes/PeopleRoutes');

dbQuery = require('./api/database/db_queries');
dbQuery.insertEntry('people', {id:76628, name:'Big Brother', birthDate:'1984-01-01', hobby:'watching'}).then((results)=>{console.log(results)});
router(app);

app.listen(port);


console.log('Server started on: ' + port);