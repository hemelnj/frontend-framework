import {
  not,
  notEmpty,
  and,
  or,
  readOnly,
  alias
} from '@ember/object/computed';
import Component from '@ember/component';
import { defineProperty } from '@ember/object';

export default Component.extend({
  model: null,
  updatedValue: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  showValidations: false,
  didValidate: false,

  notValidating: not('validation.isValidating').readOnly(),
  hasContent: notEmpty('value').readOnly(),
  hasWarnings: notEmpty('validation.warnings').readOnly(),
  isValid: and('hasContent', 'validation.isTruelyValid').readOnly(),

  shouldDisplayValidations: or(
    'showValidations',
    'didValidate',
    'hasContent'
  ).readOnly(),

  showErrorMessage: and(
    'shouldDisplayValidations',
    'validation.isInvalid'
  ).readOnly(),

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    defineProperty(
      this,
      'validation',
      readOnly(`model.validations.attrs.${valuePath}`),
    );


    defineProperty(
      this, 'updatedValue', alias(`model.${valuePath}`),
    );
  },

  focusOut() {
    this._super(...arguments);
    this.set('showValidations', true);
    console.log('message', 'showValidations');
  }

});

