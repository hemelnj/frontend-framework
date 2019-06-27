import {helper} from '@ember/component/helper';

export function codeGenerator(params/*, hash*/) {
  //console.log('message-codeGenerator', params[0]);

  let stateName = params[0];

  if(stateName != null){
    let code = stateName.toUpperCase();
    return code.split(' ').join('_');
  }
  return '';
}

export default helper(codeGenerator);
