import {
  helper
} from '@ember/component/helper';

export function ruleTextFromData(param) {

  return getStringFromRuleArray(param[0]);
}

function getStringFromRuleArray(array) {
  console.log("the givern array is ");
  console.log(array);
  console.log(array.length);
  let s = "";
  for (let c = 0; c < array.length; c++) {
    console.log("c is :" + c + "-->" + array[c]);
    if (isUndefined(array[c].ruleName)) {
      s = s + " " + array[c];
    } else {
      s = s + " " + array[c].objectType + " " + array[c].property + " " + array[c].operator;
      if (array[c].compObjectType != 'noObject') {
        s = s + " " + array[c].compObjectType;
      }
      s = s + " " + array[c].compProperty;
    }
  }
  console.log("S is : " + s);
  return s;
}

function isUndefined(t) {
  if (typeof t === "undefined") {
    return true;
  } else {
    return false;
  }
}
export default helper(ruleTextFromData);