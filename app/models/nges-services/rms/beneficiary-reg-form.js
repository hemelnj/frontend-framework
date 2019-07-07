import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  beneficiaryName: validator('presence', true),
  nationality: validator('presence', true),
  nationalityId: validator('presence', true),
  mNumber: validator('presence', true),
  address1: validator('presence', true),
  address2: validator('presence', true),
  country: validator('presence', true),
  countryId: validator('presence', true),
  state: validator('presence', true),
  stateId: validator('presence', true),
  cityOrTown: validator('presence', true),
  zipCode: validator('presence', true),

  relationWithRemitter: validator('presence', true),
  risk: validator('presence', true),

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
    beneficiaryId: DS.attr("string"),
    beneficiaryName: DS.attr("string"),
    nationality: DS.attr("string"),
    nationalityId: DS.attr("string"),
    mNumber: DS.attr("string"),
    email: DS.attr("string"),
    address1: DS.attr("string"),
    address2: DS.attr("string"),
    country: DS.attr("string"),
    countryId: DS.attr("string"),
    state: DS.attr("string"),
    stateId: DS.attr("string"),
    cityOrTown: DS.attr("string"),
    zipCode: DS.attr("number"),
    relationWithRemitter: DS.attr("string"),
    risk:DS.attr("string"),
  });
