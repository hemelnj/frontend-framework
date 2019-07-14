import {helper} from '@ember/component/helper';

export function actionAccessPermission(params/*, hash*/) {

  let actionAccess = params[0];
  let param = params[1];
  let tabInformation = params[2];

  let data = {
    editAccess: actionAccess.edit,
    stateRecordId: param.id,
    stateId: tabInformation.id
  };


  return data;
}

export default helper(actionAccessPermission);
