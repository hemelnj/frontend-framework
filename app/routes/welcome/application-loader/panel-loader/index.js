import Route from '@ember/routing/route';

export default Route.extend({

  /* application-panel-loader = index */

  model(service_data, transition) {

    let routeInfos = transition.routeInfos;
    //console.log('routeInfos', routeInfos);

    let appCode = transition.routeInfos[2].params['application_code'];
    let appPanelCode = transition.routeInfos[3].params['panel_code'];

    let appPanelInformation = {
      appCode: appCode,
      appPanelCode: appPanelCode,
    };

    return {
      appPanelInformation: appPanelInformation,
    }
  }

});
