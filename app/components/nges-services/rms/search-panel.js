import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  searchValue:'',
  init(){
    this._super(...arguments);
    this.setSearchCriteria();


    let stateList = this.appWelcome.getSateList();
    stateList.unshift({
      name:"All",
      code:"all",
      id:0
    });

    this.set('stateList',stateList);

    let activeTabInfo = {
      'id': stateList[1].id,
      'name': stateList[1].name,
      'code': stateList[1].code,
    };


    this.set('tabInformation',{

      tabInformation: {
      'id': stateList[1].id,
      'name': stateList[1].name,
      'code': stateList[1].code,
    }});

    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-remitter',
        label: 'Remitters',
      },
      edit: {
        routePath: 'edit-remitter',
        label: 'View Remitter',
      }
    });

    this.set('activeTabInfo',activeTabInfo);

    this.set('tableData', {"data":[{"type":"remittanceTransactions","attributes":{"id":"0779235d-eade-4826-ae9f-fcdf3d08905c","remitter":null,"remittanceType":{"id":"1","code":"1","name":"General","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"remittancePurpose":{"id":"1","code":"1","name":"General Purpose","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"fundSource":{"id":"1","code":"1","name":"General","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"deliveryAgent":{"id":"1","code":"1","name":"PBL","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"beneficiarysCountry":{"id":"2","code":"UK","name":"United Kingdom","nationality":"British","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"beneficiary":{"id":"1","name":"Rahman","addressOne":"Kaliakair","addressTwo":"Dhanmondi","country":{"id":"1","code":"BD","name":"Bangladesh","nationality":"Bangladeshi","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"state":{"id":"1","code":"1","name":"Dhaka","createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"zipCode":"104","nationality":{"id":"1","code":"BD","name":"Bangladesh","nationality":"Bangladeshi","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"contactNo":"121323","emailId":"abc@gmail.com","relationshipWithRemitter":"Brother","remarks":"n/a","risk":"20%","olcmState":{"id":1021,"name":"Authorized","code":"AUTHORIZED","statusFlag":"A"},"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null,"isMLRO_Reviewed":false},"beneficiarysBank":{"id":"1","name":"Prime Bank","country":null,"branches":null,"code":"1","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null},"beneficiarysBranch":{"id":"1","code":"1","name":"Dhaka"},"currency":{"id":"2","code":"$","name":"Dollar","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"paymentMode":{"id":"1","code":"1","name":"BFTN","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"inputAmount":1010.0,"transferAmount":1010.0,"localAmount":1010.0,"commissionAmount":1010.0,"totalValueNeedToPay":1010.0,"totalValueNeedToAdjust":1010.0,"totalPayAmount":1010.0,"olcmState":{"id":8,"name":null,"code":null,"statusFlag":null},"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null,"batchId":"4","tracerId":1},"id":"0779235d-eade-4826-ae9f-fcdf3d08905c"},{"type":"remittanceTransactions","attributes":{"id":"85d787f7-2def-448e-9c83-b9c488dd0c62","remitter":null,"remittanceType":{"id":"1","code":"1","name":"General","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"remittancePurpose":{"id":"1","code":"1","name":"General Purpose","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"fundSource":{"id":"1","code":"1","name":"General","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"deliveryAgent":{"id":"1","code":"1","name":"PBL","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"beneficiarysCountry":{"id":"2","code":"UK","name":"United Kingdom","nationality":"British","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"beneficiary":{"id":"2","name":"Munem","addressOne":"Gazipur","addressTwo":"n/a","country":{"id":"1","code":"BD","name":"Bangladesh","nationality":"Bangladeshi","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"state":{"id":"1","code":"1","name":"Dhaka","createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"zipCode":"1201","nationality":{"id":"1","code":"BD","name":"Bangladesh","nationality":"Bangladeshi","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"contactNo":"0175657983","emailId":"Munem@gmail.com","relationshipWithRemitter":"Brother","remarks":"n/a","risk":"20%","olcmState":{"id":1021,"name":"Authorized","code":"AUTHORIZED","statusFlag":"A"},"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null,"isMLRO_Reviewed":false},"beneficiarysBank":{"id":"1","name":"Prime Bank","country":null,"branches":null,"code":"1","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null},"beneficiarysBranch":{"id":"1","code":"1","name":"Dhaka"},"currency":{"id":"1","code":"BDT","name":"Taka","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"paymentMode":{"id":"1","code":"1","name":"BFTN","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"inputAmount":1000.0,"transferAmount":1000.0,"localAmount":1000.0,"commissionAmount":1000.0,"totalValueNeedToPay":1000.0,"totalValueNeedToAdjust":1000.0,"totalPayAmount":1000.0,"olcmState":{"id":8,"name":null,"code":null,"statusFlag":null},"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null,"batchId":"12","tracerId":1},"id":"85d787f7-2def-448e-9c83-b9c488dd0c62"},{"type":"remittanceTransactions","attributes":{"id":"f7a2f728-216f-4411-8934-354c07edef7a","remitter":null,"remittanceType":{"id":"1","code":"1","name":"General","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"remittancePurpose":{"id":"1","code":"1","name":"General Purpose","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"fundSource":{"id":"1","code":"1","name":"General","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"deliveryAgent":{"id":"1","code":"1","name":"PBL","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"beneficiarysCountry":{"id":"2","code":"UK","name":"United Kingdom","nationality":"British","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"beneficiary":{"id":"2","name":"Munem","addressOne":"Gazipur","addressTwo":"n/a","country":{"id":"1","code":"BD","name":"Bangladesh","nationality":"Bangladeshi","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"state":{"id":"1","code":"1","name":"Dhaka","createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"zipCode":"1201","nationality":{"id":"1","code":"BD","name":"Bangladesh","nationality":"Bangladeshi","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"states":[]},"contactNo":"0175657983","emailId":"Munem@gmail.com","relationshipWithRemitter":"Brother","remarks":"n/a","risk":"20%","olcmState":{"id":1021,"name":"Authorized","code":"AUTHORIZED","statusFlag":"A"},"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null,"isMLRO_Reviewed":false},"beneficiarysBank":{"id":"1","name":"Prime Bank","country":null,"branches":null,"code":"1","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null},"beneficiarysBranch":{"id":"1","code":"1","name":"Dhaka"},"currency":{"id":"2","code":"$","name":"Dollar","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"paymentMode":{"id":"1","code":"1","name":"BFTN","status":1,"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null},"inputAmount":242.0,"transferAmount":242.0,"localAmount":242.0,"commissionAmount":242.0,"totalValueNeedToPay":242.0,"totalValueNeedToAdjust":242.0,"totalPayAmount":242.0,"olcmState":{"id":8,"name":null,"code":null,"statusFlag":null},"function":null,"location":null,"createdBy":null,"createdAt":null,"updatedBy":null,"updatedAt":null,"comment":null,"batchId":"14","tracerId":1},"id":"f7a2f728-216f-4411-8934-354c07edef7a"}],"tableHeaderPropertyList":[{"name":"id","visibleName":"ID"},{"name":"batchId","visibleName":"Batch Id"},{"name":"tracerId","visibleName":"TracerId Id"},{"name":"remittanceType.name","visibleName":"Remittance Type"},{"name":"remittancePurpose.name","visibleName":"Remittance Purpose"},{"name":"fundSource.name","visibleName":"Fund Source"},{"name":"deliveryAgent.name","visibleName":"Delivery Agent"},{"name":"beneficiary.name","visibleName":"Beneficiary"}]});

    this.set("actionAccess", {
      view: true,
      edit: true,
    });
  },

  setSearchCriteria() {
    let data = [
      {
        id: 1,
        type: "criteria",
        attributes: {
          name: "Name"
        }
      },
      {
        id: 1,
        type: "criteria",
        attributes: {
          name: "Contact No"
        }
      },
    ];

    this.set("searchCriteria", data);
  },
  actions:{
    onChangeSearchCriteria(value){
      console.log('message-onChangeSearchCriteria', value);
    },

    getSearchValue(value){
      console.log('message-onChangeSearchValue', value);
    },
    searchAction(){
      let searchValue = this.get('searchValue');
      console.log('message-onChangeSearchValue', searchValue);
    }
  }

})
