import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  countryName: validator('presence', true),
  nationality: validator('presence', true),
  nationalityId: validator('presence', true),
  stateName: validator('presence', true),
  stateCode: validator('presence', true),
  townName: validator('presence', true),
  townCode: validator('presence', true),

  email: [
    validator('presence', true),
    validator('format', {type: 'email'})
  ]

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
    countryName: DS.attr("string"),
    nationality: DS.attr("string"),
    nationalityId: DS.attr("string"),
    stateName: DS.attr("string"),
    stateCode: DS.attr("string"),
    townName: DS.attr("string"),
    townCode: DS.attr("string"),

  });
