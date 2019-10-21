import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const {attr} = DS;

const validAmountRegex = /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9]{1,6})?$/;
const contactNumberRegex = /^(\+\d{1,3}[- ]?)?\d{11}$/;
const zipCodeRegex = /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)?$/;


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
  payAmountModeId: validator('presence', true),

  inputAmount: {
    validators: [
      validator('presence', true),
      /*validator('format', {
        regex: validAmountRegex,
        message:
          'Please input valid amount'
      })*/
    ]
  },
  transferAmount: {
    validators: [
      validator('presence', true),
      /*validator('format', {
        regex: validAmountRegex,
        message:
          'Please input valid transfer amount'
      })*/
    ]
  },

  localAmount: {
    validators: [
      validator('presence', true),
      /*validator('format', {
        regex: validAmountRegex,
        message:
          'Please input valid local amount'
      })*/
    ]
  },

  comissionAmount: {
    validators: [
      validator('presence', true),
      /*validator('format', {
        regex: validAmountRegex,
        message:
          'Please input valid comission amount'
      })*/
    ]
  },

  totalPayValue: {
    validators: [
      validator('presence', true),
      /*validator('format', {
        regex: validAmountRegex,
        message:
          'Please input valid total payable value'
      })*/
    ]
  },

  totalAdjustValue: {
    validators: [
      validator('presence', true),
      /*validator('format', {
        regex: validAmountRegex,
        message:
          'Please input valid adjustable amount'
      })*/
    ]
  },

  totalPayAmount: {
    validators: [
      validator('presence', true),
      /*validator('format', {
        regex: validAmountRegex,
        message:
          'Please input valid total payable amount'
      })*/
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
