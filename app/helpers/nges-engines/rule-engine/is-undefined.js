import {
  helper
} from '@ember/component/helper';

export function isUndefined(param) {

  if (typeof param.ruleName === "undefined") {
    return true;
  } else {
    return false;
  }

}

export default helper(isUndefined);