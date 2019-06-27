import { helper } from '@ember/component/helper';

export function attributeDisplayHelper(params/*, hash*/) {

  let data = params[0]; //data

  return data[params[1]]; // key
}

export default helper(attributeDisplayHelper);
