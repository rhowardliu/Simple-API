'use strict';
module.exports = app => {
    const peopleList = require('../controllers/peopleController');

    app.route('/people')
    .get(peopleList.getPeople)
    .post(peopleList.addPerson);


  // app.route('/tasks/:peopleId')
  //   .get(peopleList.getPersonById)
  //   .put(peopleList.updatePersonById)
  //   .delete(peopleList.deletePersonById);
};