import {helper} from '@ember/component/helper';

let NOT_FOUND_TEMPLATE_NAME = 'nges-base/template-not-found';

export function templateNameFormatter(params/*, hash*/) {

  let templatePath = params[0].templatePath;
  let templateName = params[0].name;

  return getTemplate(templatePath, templateName);
}


function getTemplate(templatePath, templateName) {

  let completeTemplateName = '';

  try {

    if (templatePath === undefined || templateName === undefined) {

      if (templatePath == null || templateName == null) {
        if (templatePath.length < 0 || templateName.length < 0) {

          completeTemplateName = NOT_FOUND_TEMPLATE_NAME;                   // if invalid information
        }
      }

    } else {

      completeTemplateName = templatePath + '/' + templateName;             // create full path
      completeTemplateName = completeTemplateName.replace(/\/+/g, '/');     // to replace multiple slashes
    }
  } catch (e) {
    console.error('Template-Error:-', 'template path or template information are not defined');
    completeTemplateName = NOT_FOUND_TEMPLATE_NAME;
  }

  if (completeTemplateName === '') {
    console.error('Template-Error:-', '(template path or template name) should not be null or empty');

    return NOT_FOUND_TEMPLATE_NAME;
  } else {
    return completeTemplateName;
  }
}


export default helper(templateNameFormatter);

/*

(templatePath !== '' || templateName !== '') ||
(templatePath != null || templateName != null) ||
(templatePath.length < 0 || templateName.length < 0)*/
