'use strict';
module.exports = app => {
    const peopleList = require('../controllers/peopleController');

    app.route('/people')
    .get(todoList.getPeople)
    .post(todoList.addPerson);


  app.route('/tasks/:peopleId')
    .get(todoList.getPersonById)
    .put(todoList.updatePersonById)
    .delete(todoList.deletePersonById);
};