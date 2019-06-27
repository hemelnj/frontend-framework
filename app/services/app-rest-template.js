import Service from '@ember/service';
import $ from "jquery";

export default Service.extend({

  /*restTemplate(url, method, data, headers) {
    let requestData = {};

    if (headers === null) {
      headers = {
        'Authorization': 'Basic xxxxxxxxxxxxx',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }


    if (data != null) {
      requestData['data'] = JSON.stringify(data);
    }

    requestData['url'] = url;
    requestData['method'] = method;
    requestData['dataType'] = 'json';
    requestData['headers'] = headers;
    requestData['statusCode'] = {
      400: function (result) {
        return {'status': 'failed', 'message': 'error happened', 'results': result.getMessage()};
      },
      200: function (result) {
        return {'status': 'success', 'message': 'successfully done', 'results': result};
      },
      201: function (result) {
        return {'status': 'success', 'message': 'successfully done', 'results': result};
      }
    };

    return $.ajax(requestData);
  },*/


  httpRestClient(url, method, data, headers, beforeSend) {
    let requestData = {};

    /* if (headers === null) {
      headers = {
        'Authorization': 'Basic xxxxxxxxxxxxx',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    */

    if (data != null) {
      requestData['data'] = data;
    }

    requestData['url'] = url;
    requestData['method'] = method;
    requestData['dataType'] = 'json';
    requestData['headers'] = headers;
    requestData['beforeSend'] = beforeSend;


    /*requestData['success'] = function (result) {
      return {'status': 'success', 'message': 'successfully done', 'results': result};
    };
    requestData['error'] = function (XMLHttpRequest, textStatus, errorThrown) {
      return {'status': 'error', 'message': 'successfully done', 'results': result};
    };*/

    return $.ajax(requestData);
  },

});
