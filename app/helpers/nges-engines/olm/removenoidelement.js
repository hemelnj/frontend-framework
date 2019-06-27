import { helper } from '@ember/component/helper';

export function removenoidelement(params) {
  
  let [args]=params;
  //console.log("----args ----", args);

  if(args === "")
  {
    return false;
  }
  else if(args == null)
  {
    return false;
  }
  else
  {
    return true;
  }
}

export default helper(removenoidelement);
