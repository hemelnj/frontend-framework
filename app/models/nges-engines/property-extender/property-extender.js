import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({

  classTypeCode: validator('presence', true),
  classTypeName: validator('presence', true),
  displayName: validator('presence', true),

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
    classTypeId: DS.attr("string"),
    classTypeCode: DS.attr("string"),
    classTypeName: DS.attr("string"),
    displayName: DS.attr("string"),
    type: DS.attr("string"),
    typeLength: DS.attr("string"),
    refObject: DS.attr("string"),
  });
