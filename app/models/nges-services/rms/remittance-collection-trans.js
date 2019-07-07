import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const Validations = buildValidations({
  remId: validator('presence', true),
  remTypeId: validator('presence', true),
  remPurposeId: validator('presence', true),
  fundSourceId: validator('presence', true),
  deliveryAgentId: validator('presence', true),
  beneficiaryCountryId: validator('presence', true),
  beneficiaryId: validator('presence', true),
  beneficiaryBankId: validator('presence', true),
  beneficiaryBranchId: validator('presence', true),
  inputAmount: validator('presence', true),
  currencyId: validator('presence', true),
  transferAmount: validator('presence', true),
  localAmount: validator('presence', true),
  comissionAmount: validator('presence', true),
  totalPayValue: validator('presence', true),
  totalAdjustValue: validator('presence', true),
  totalPayAmount: validator('presence', true),
  payAmountModeId: validator('presence', true),
});

export default DS.Model.extend(
  Validations,
  {
    remId: DS.attr("string"),
    remTypeId: DS.attr("string"),
    remPurposeId: DS.attr("string"),
    fundSourceId: DS.attr("string"),
    deliveryAgentId: DS.attr("string"),
    beneficiaryCountryId: DS.attr("string"),
    beneficiaryId: DS.attr("string"),
    beneficiaryBankId: DS.attr("string"),
    beneficiaryBranchId: DS.attr("string"),
    inputAmount: DS.attr("number"),
    currencyId: DS.attr("string"),
    transferAmount: DS.attr("number"),
    localAmount: DS.attr("number"),
    comissionAmount: DS.attr("number"),
    totalPayValue: DS.attr("number"),
    totalAdjustValue: DS.attr("number"),
    totalPayAmount: DS.attr("number"),
    payAmountModeId: DS.attr("string"),
  });
