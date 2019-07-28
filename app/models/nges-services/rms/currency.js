import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({

  currencyId: validator('presence', true),
  currencyName: validator('presence', true),
  currencyCode: validator('presence', true),

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
    currencyId: DS.attr("string"),
    currencyName: DS.attr("string"),
    currencyCode: DS.attr("string"),
  });