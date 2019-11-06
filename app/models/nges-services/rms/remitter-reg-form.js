import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  type: validator('presence', true),
  remitterName: validator('presence', true),
  fathersName: validator('presence', true),
  mothersName: validator('presence', true),
  dob: validator('presence', true),
  nationality: validator('presence', true),
  nationalityId: validator('presence', true),
  mNumber: validator('presence', true),
  noj: validator('presence', true),
  incomeRange: validator('presence', true),
  expetedRemitance: validator('presence', true),
  remarks: validator('presence', true),
  address1: validator('presence', true),
  address2: validator('presence', true),
  country: validator('presence', true),
  countryId: validator('presence', true),
  state: validator('presence', true),
  stateId: validator('presence', true),
  cityOrTown: validator('presence', true),
  zipCode: validator('presence', true),
  proofOfAddress: validator('presence', true),
  primaryPhotoType: validator('presence', true),
  primaryPhotoId: validator('presence', true),
  primaryPhotoIssue: validator('presence', true),
  primaryPhotoExpiry: validator('presence', true),
  secondaryPhotoType: validator('presence', true),
  secondaryPhotoId: validator('presence', true),
  secondaryPhotoIssue: validator('presence', true),
  secondaryPhotoExpiry: validator('presence', true),
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
    type: DS.attr("string"),
    remId: DS.attr("string"),
    remitterName: DS.attr("string"),
    fathersName: DS.attr("string"),
    mothersName: DS.attr("string"),
    dob: DS.attr("string"),
    nationality: DS.attr("string"),
    nationalityId: DS.attr("string"),
    mNumber: DS.attr("string"),
    email: DS.attr("string"),
    noj: DS.attr("string"),
    incomeRange: DS.attr("number"),
    expetedRemitance: DS.attr("number"),
    remarks: DS.attr("string"),
    address1: DS.attr("string"),
    address2: DS.attr("string"),
    country: DS.attr("string"),
    countryId: DS.attr("string"),
    state: DS.attr("string"),
    stateId: DS.attr("string"),
    cityOrTown: DS.attr("string"),
    zipCode: DS.attr("number"),
    proofOfAddress: DS.attr("string"),
    primaryPhotoType: DS.attr("string"),
    primaryPhotoId: DS.attr("string"),
    primaryPhotoIssue: DS.attr("string"),
    primaryPhotoExpiry: DS.attr("string"),
    secondaryPhotoType: DS.attr("string"),
    secondaryPhotoId: DS.attr("string"),
    secondaryPhotoIssue: DS.attr("string"),
    secondaryPhotoExpiry: DS.attr("string"),
    risk:DS.attr("string"),
  });
