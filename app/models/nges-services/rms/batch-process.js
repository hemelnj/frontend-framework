import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  batchId: validator('presence', true),
  batchName: validator('presence', true),
  batchReqType: validator('presence', true),
  batchApi: validator('presence', true),

  /*age: [
    validator('presence', true),
    validator('number', {
      message:'Error! This is not an age.',
      allowString: true,
      integer: true,
      gt: 0,
      lte: 150
    }),
  ],

  password: [
    validator('presence', true),
    validator('length', {
      min: 4,
      max:8
    })
  ],*/


});

export default DS.Model.extend(
  Validations,
  {
    batchId: DS.attr("string"),
    batchName: DS.attr("string"),
    batchApi: DS.attr("string"),
    batchReqType: DS.attr("string"),
  });
