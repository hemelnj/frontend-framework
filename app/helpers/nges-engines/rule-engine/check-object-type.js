import {
  helper
} from '@ember/component/helper';

export function checkObjectType(param) {
  if (param === 'noObject') {
    return false;
  } else {
    return true;
  }
}

export default helper(checkObjectType);
