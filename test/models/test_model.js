const modelValidate = require('../../api/models/model_validate').modelValidate;
const expect = require('../test_init').expect;


describe('Model Validation',()=>{

    let model = { attributes: ['id', 'name']};

    it('should be rejected if object has insufficient attributes', ()=>{
        let alex = {name:'Alex'};
        return expect(modelValidate(alex, model))
                .to.eventually.be.rejected
                .and.to.have.property('statusCode', 400);
    });

    it ('should resolve with object that only has required attributes', ()=>{
        let jane = {id: 1, name:'Jane', hobby:'sleep'};
        let jane_model = {id: 1, name:'Jane'};
        return expect(modelValidate(jane, model))
                .to.eventually.deep.equal(jane_model)});
})