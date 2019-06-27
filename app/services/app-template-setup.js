import Service from '@ember/service';

import ngesEngineConfiguration from '../components/nges-engines/nges-engines-configuration';
import ngesServiceConfiguration from '../components/nges-services/nges-services-configuration';

export default Service.extend({

  getMetaInformation() {

    let data = ngesEngineConfiguration.concat(ngesServiceConfiguration);

    return data;
  },

  getSingleTemplateName(appCode, appPanelCode, appModuleCode, appMenuTemplateCode, appSubmenuTemplateCode) {


    let appRawTemplate = this.getMetaInformation();
    let appTemplates = filterSelectedTemplates(appCode, appPanelCode, appModuleCode, appMenuTemplateCode, appRawTemplate);

    let templateInformation = {};
    for(let appTemplate of appTemplates){

      let templates = appTemplate['templates'];
      for(let template of templates){

        let appRawTemplateCode = template.code;
        if (appRawTemplateCode === appSubmenuTemplateCode) {

          templateInformation = template;
          templateInformation['templatePath'] = appTemplate['templatePath'];
          let templatePath = appTemplate.templatePath;
          let templateName = template.name;

          templateInformation['completeTemplateName'] = getValidTemplateName(templatePath, templateName);

          return templateInformation;
        }
      }
    }

    templateInformation['completeTemplateName'] = NOT_FOUND_TEMPLATE_NAME;
    return templateInformation;
  },


  getSingleDetailViewTemplateName(
    appCode,
    appPanelCode,
    appModuleCode,

    appMenuTemplateCode,
    appSubmenuTemplateCode,
    appTemplateDetailCode
  ) {

    let appRawTemplate = this.getMetaInformation();
    let appTemplates = filterSelectedTemplates(appCode, appPanelCode, appModuleCode, appMenuTemplateCode, appRawTemplate);


    let templateInformation = {};
    for(let appTemplate of appTemplates){


      let templates = appTemplate['templates'];
      for(let template of templates){


        if (template.code === appSubmenuTemplateCode) {

          let detailViewTemplates = template.detailView;
          for(let detailView of detailViewTemplates){


            let appRawTemplateDetailCode = detailView.code;
            if (appRawTemplateDetailCode === appTemplateDetailCode) {


              templateInformation = detailView;
              templateInformation['templatePath'] = appTemplate['templatePath'];
              templateInformation['detailPath'] = template['detailPath'];

              let templatePath = appTemplate.templatePath + template['detailPath'];
              let templateName = detailView.name;

              templateInformation['completeTemplateName'] = getValidTemplateName(templatePath, templateName);
              return templateInformation;
            }
          }

        }
      }
    }

    templateInformation['completeTemplateName'] = NOT_FOUND_TEMPLATE_NAME;

    return templateInformation;
  }

});

let filterSelectedTemplates = function (appCode, appPanelCode, appModuleCode, appMenuTemplateCode, appRawTemplate) {

  let appSelectedTemplates = [];
  for (let i = 0; i < appRawTemplate.length; i++) {

    let appRawCode = appRawTemplate[i]['appCode'];
    let appRawPanelCode = appRawTemplate[i]['appPanelCode'];
    let appRawModuleCode = appRawTemplate[i]['appModuleCode'];
    let appRawmicroServiceFunctionCode = appRawTemplate[i]['appMenuTemplateCode'];

    if (
      appRawCode === appCode &&
      appRawPanelCode === appPanelCode &&
      appRawModuleCode === appModuleCode &&
      appRawmicroServiceFunctionCode === appMenuTemplateCode
    ) {

      appSelectedTemplates.push(appRawTemplate[i]);
    }
  }

  return appSelectedTemplates;
};


let NOT_FOUND_TEMPLATE_NAME = 'nges-base/template-not-found';                         // 'template-not-found' component name
let getValidTemplateName = function (templatePath, templateName) {

  let completeTemplateName = null;
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

  if (completeTemplateName === null) {
    console.error('Template-Error:-', '(template path or template name) should not be null or empty');

    return NOT_FOUND_TEMPLATE_NAME;
  } else {
    return completeTemplateName;
  }
};
