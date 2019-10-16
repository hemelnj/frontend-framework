import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  stateName: validator('presence', true),
  stateCode: validator('presence', true)

});

export default DS.Model.extend(
  Validations,
  {
    stateName: DS.attr("string"),
    stateCode: DS.attr("string"),
  });
