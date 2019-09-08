import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  exchangeHouseId: validator('presence', true),
  inputAmount: validator('presence', true),
});

export default DS.Model.extend(
  Validations,
  {
    exchangeHouseId: DS.attr("string"),
    inputAmount: DS.attr("string"),
  });
