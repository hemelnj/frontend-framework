import {
  helper
} from '@ember/component/helper';

export function ruleViewUpdate(param) {
  let action = param[0].split("##@@");
  console.log('message', action);
  let rule='';
  for (let i = 0; i < action.length; i++) {
    rule = action[i]+', '+rule;
  }
  return rule;
}

export default helper(ruleViewUpdate);
