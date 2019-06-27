import { helper } from '@ember/component/helper';

export function codeGenerator(params/*, hash*/) {
  //console.log('message-codeGenerator', params[0]);
  let code=params[0].toUpperCase();
  return code.split(' ').join('_');
}

export default helper(codeGenerator);
