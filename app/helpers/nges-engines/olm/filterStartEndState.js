import {helper} from '@ember/component/helper';

export function filterStartEndState(param) {

  //console.log('message', param);


   let data=param[0].toLowerCase();
   if(data==='start' || data==='end')
   {
     return false;
   }

  return true;
}

export default helper(filterStartEndState);
