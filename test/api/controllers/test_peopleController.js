toTest = require('../../../api/controllers/peopleController');
model = require('../../../api/models/db_model')

samplePerson = {
    id: 2,
    name: 'Nassim Taleb',
    birthDate: '1958-12-29',
    hobby: 'Uncertainty analysis',
    something: 'something'
}

console.log(toTest.modelValidate(samplePerson, model.person));