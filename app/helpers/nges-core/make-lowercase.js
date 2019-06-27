import { helper } from '@ember/component/helper';

export function makeLowercase(params/*, hash*/) {

  let text = params[0];

  return (text !== undefined && text !== null) ? text.toLowerCase() : '';
}

export default helper(makeLowercase);
