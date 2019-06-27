import { helper } from '@ember/component/helper';

export function indexHelper(params) {
  let [arg1,arg2,arg3]=params;
  if(arg3=="+")
  {
    return parseInt(arg1)+parseInt(arg2);
  }
  else if(arg3=="-")
  {
    return parseInt(arg1)-parseInt(arg2); 
  }
  
}

export default helper(indexHelper);
