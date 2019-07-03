import {helper} from '@ember/component/helper';

export function objectToString(param) {

  return JSON.stringify(param[0]);

}

export default helper(objectToString);
