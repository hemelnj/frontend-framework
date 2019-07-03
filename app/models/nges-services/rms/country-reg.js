import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({

  countryId: validator('presence', true),
  countryISOCode: validator('presence', true),
  countryName: validator('presence', true),
  nationality: validator('presence', true),

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
    countryId: DS.attr("string"),
    countryISOCode: DS.attr("string"),
    countryName: DS.attr("string"),
    nationality: DS.attr("string"),
  });
