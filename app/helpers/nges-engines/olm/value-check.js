import { helper } from '@ember/component/helper';

export function valueCheck(param1) {
  
    
  return parseInt(param1)+1;
}

export default helper(valueCheck);
