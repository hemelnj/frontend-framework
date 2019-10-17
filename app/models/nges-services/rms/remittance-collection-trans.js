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
  currencyId: validator('presence', true),
  totalPayValue: validator('presence', true),
  totalAdjustValue: validator('presence', true),
  totalPayAmount: validator('presence', true),
  payAmountModeId: validator('presence', true),

  inputAmount: {
    validators: [
      //validator('presence', true),
      validator('format', {
        regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9][0-9])?$/,
        message:
          'Please input valid amount'
      })
    ]
  },
  transferAmount: {
    validators: [
      //validator('presence', true),
      validator('format', {
        regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9][0-9])?$/,
        message:
          'Please input valid amount'
      })
    ]
  },

  localAmount: {
    validators: [
      //validator('presence', true),
      validator('format', {
        regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9][0-9])?$/,
        message:
          'Please input valid amount'
      })
    ]
  },

  comissionAmount: {
    validators: [
      //validator('presence', true),
      validator('format', {
        regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9][0-9])?$/,
        message:
          'Please input valid amount'
      })
    ]
  },

  totalPayValue: {
    validators: [
      //validator('presence', true),
      validator('format', {
        regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9][0-9])?$/,
        message:
          'Please input valid amount'
      })
    ]
  },

  totalAdjustValue: {
    validators: [
      //validator('presence', true),
      validator('format', {
        regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9][0-9])?$/,
        message:
          'Please input valid amount'
      })
    ]
  },

  totalPayAmount: {
    validators: [
      //validator('presence', true),
      validator('format', {
        regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9][0-9])?$/,
        message:
          'Please input valid amount'
      })
    ]
  },


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
