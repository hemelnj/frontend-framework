import Service, {inject as service} from '@ember/service';


const headersConfig = {
  'Authorization': 'Basic xxxxxxxxxxxxx',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};


export default Service.extend({
  ajax: service(),
  headers: headersConfig,

  appConfiguration: service('app-configuration'),



  menuTreeProcessing(url, formData, menuTree, subMenuList) {

    //console.log('message-formData', formData);
    //console.log('message-menuTree', menuTree);
    //console.log('message-subMenuList', subMenuList);

    let accessToken = this.appConfiguration.getAccessToken();
    let timestamp = Math.floor(Date.now() / 1000);
    let data = {
      data: {
        type: "menutree",
        id: menuTree.id,
        attributes: {
          "classTypeId": formData.selectOlmObject.id,
          "code": "menuCode",
          "comments": "string",
          "createdAt": 0,
          "createdBy": "string",
          "describtion": "string",
          "extra": "string",
          "id": formData.selectOlmObject.id,
          "lastUpdatedAt": 0,
          "lastUpdatedBy": "string",
          "name": "string",
          menuTree: {
            "id": menuTree.id,
            "subMenuList": subMenuList,
            "code": "menuTreeCode",
            "comments": "string",
            "createdAt": 0,
            "createdBy": "string",
            "describtion": "string",
            "extra": "string",
            "lastUpdatedAt": 0,
            "lastUpdatedBy": "string",
            "menuTreeTemplate": {
              "id": 2
            },
            "parent": {
              "id": 2
            },
            "name": formData.selectOlmObject.name
          }
        }
      }
    };

    console.log('message', data);

     return $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(data),
      dataType: "json",

      beforeSend: function (xhr) {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
        //console.log('message-Authorization', "Basic " + btoa("USER_CLIENT_APP : password"));
      },

      statusCode: {
        400: function (result) {
          return {'status': 'error', 'message': 'error happen'};
        },
        201: function (result) {
          alert('Successfully Saved');
          return result;
        }
      }
    });

  },


  menuTreePUTProcessing(url, formData, menuTree, subMenuList) {

    console.log('----------------------------------------------------');
    console.log('message-formData', formData);
    console.log('message-menuTree', menuTree);
    console.log('message-subMenuList', subMenuList);

    console.log('message:- menuTree.code', menuTree.code);

    let accessToken = this.appConfiguration.getAccessToken();
    let timestamp = Math.floor(Date.now() / 1000);
    let data = {
      type: "menutree",
      id: timestamp,
      attributes: {
        "classTypeId": formData.selectOlmObject.id,
        "code": "string",
        "comments": "string",
        "createdAt": 0,
        "createdBy": "string",
        "describtion": "string",
        "extra": "string",
        "id": formData.selectOlmObject.id,
        "lastUpdatedAt": 0,
        "lastUpdatedBy": "string",
        "name": "string",
        menutree: {
          "id": menuTree.id,
          "subMenuList": subMenuList,
          "code": "string",
          "comments": "string",
          "createdAt": 0,
          "createdBy": "string",
          "describtion": "string",
          "extra": "string",
          "lastUpdatedAt": 0,
          "lastUpdatedBy": "string",
          "menuTreeTemplate": {
            "id": 2
          },
          "parent": {
            "id": 2
          },
          "name": formData.selectOlmObject.name
        }
      },
    };

    /*let data = {
      "classTypeId": formData.selectOlmObject.id,
      "code": "string",
      "comments": "string",
      "createdAt": 0,
      "createdBy": "string",
      "describtion": "string",
      "extra": "string",
      "id": formData.selectOlmObject.id,
      "lastUpdatedAt": 0,
      "lastUpdatedBy": "string",
      "name": "string"
    };

    data['menuTree'] = {
      "id": menuTree.id,
      "subMenuList": subMenuList,
      "code": "string",
      "comments": "string",
      "createdAt": 0,
      "createdBy": "string",
      "describtion": "string",
      "extra": "string",
      "lastUpdatedAt": 0,
      "lastUpdatedBy": "string",
      "menuTreeTemplate": {
        "id": 2
      },
      "parent": {
        "id": 2
      },
      "name": formData.selectOlmObject.name
    };*/


    return $.ajax({
      type: "PUT",
      url: url,
      data: JSON.stringify(data),
      dataType: "json",

      beforeSend: function (xhr) {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
        //console.log('message-Authorization', "Basic " + btoa("USER_CLIENT_APP : password"));
      },

      statusCode: {
        400: function (result) {
          return {'status': 'error', 'message': 'error happen'};
        },
        200: function (result) {
          return result;
        }
      }

      /*success: function (msg) {
        console.log('message-put-data', 'success?');

        //context.loadData();
        //context.set('showmessage',true);
      },

      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('message-error', errorThrown);
        console.log('message-', textStatus);
        //console.log('message-error', errorThrown);
      }*/
    });


    /*return this.ajax.request(url, {
      data: JSON.stringify(data),
      dataType: 'json',
      headers: this.get('headers'),
      method: 'PUT',
      statusCode: {
        400: function (result) {
          return {'status': 'error', 'message': 'error happen'};
        },
        200: function (result) {
          return result;
        }
      }
    });*/

  }


});
