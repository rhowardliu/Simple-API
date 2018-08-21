'use strict';

const peopleController = require('../controllers/peopleController');
const errResponse = require('../errors/errorResponse');



module.exports = (app) => {
    app.route('/people')
    // .get(getPeople)
    .post(peopleController.addPerson);


    app.route('/people/:personId')
      .get(peopleController.getPersonById)
      .put(peopleController.updatePersonById)
      .delete(peopleController.deletePersonById);

    app.use('*', errResponse.pageNotFound)
    app.use(errResponse.customError);
};