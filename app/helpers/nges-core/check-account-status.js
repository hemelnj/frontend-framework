import { helper } from '@ember/component/helper';

export function checkAccountStatus(params/*, hash*/) {

  let str = params[0];

  if(str === true){
    return "Active";
  }
  else {
    return "Inactive"
  }
}

export default helper(checkAccountStatus);
