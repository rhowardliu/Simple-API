'use strict';

const peopleController = require('../controllers/peopleController');
const errResponse = require('../errors/errorResponse');

// const getPeople = (req, res) => {
//   Person.find({},function(err, results) {
//     return res.send(results);
//   });
// };

module.exports = (app) => {
    app.route('/people')
    // .get(getPeople)
    .post(peopleController.addPerson);


    app.route('/people/:personId')
      // .get(peopleList.getPersonById)
      // .put(peopleList.updatePersonById)
      // .delete(peopleList.deletePersonById);

    app.use('*', errResponse.pageNotFound)
    app.use(errResponse.customError);
};