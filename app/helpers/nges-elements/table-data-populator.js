import {helper} from '@ember/component/helper';

export function tableDataPopulator(params/*, hash*/) {


  let item = params[0];
  let tableHeader = params[1];

  if (item === null || tableHeader === null) {
    return '--';

  } else {
    let displayKeyName = tableHeader.name;


    //let data = item[tableHeader.name] == null ? '--': item[displayKeyName];
    if (displayKeyName.includes('.')) {
      let keys = displayKeyName.split('.');


      if(keys.length === 2) {
        return item[keys[0]][keys[1]];              // layer 1
      }
      else if(keys.length === 3) {
        return item[keys[0]][keys[1]][keys[2]];     // layer 2
      }
    }

    // let data = item.hasOwnProperty(displayKeyName);
    return item[displayKeyName];
  }

}

export default helper(tableDataPopulator);
