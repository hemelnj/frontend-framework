import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  remId: validator('presence', true),
  exchangeHouseId: validator('presence', true),
  inputAmount: validator('presence', true),
});

export default DS.Model.extend(
  Validations,
  {
    remId: DS.attr("string"),
    exchangeHouseId: DS.attr("string"),
    inputAmount: DS.attr("string"),
  });
