import Component from '@ember/component';
import config from 'frontend-engine/config/environment';

import $ from 'jquery';

import {
  connecthelper,
  getEvents,
  getSelectedObject,
  getStateColors,
  getStates,
  handleClick,
  setStartEndIds,
  init,
  setContext,
  setRemove,
  getRootStage,
  setStageLayer, getPOS, setPOS, fitStageIntoParentContainer
} from './diagram/tools';
import {
  inject as service
} from '@ember/service';


export default Component.extend({


  appConfiguration: service('app-configuration'),
  olmSetupService: service('nges-engines/olm/olm-setup'),
  store: service(),
  states: null,
  actionevents: null,
  initdata: '',
  colors: [],
  roles: '',
  nofiy: '',
  notifier: service(),


  actions: {

    onChangeClassTypes(value) {
      let classTypeId = value.attributes.id;
      this.set('classTypeId', classTypeId);
      this.didInsertElement();
      this.loadDataByClassTypeId(classTypeId)
    },

    exportImage(){

      let downloadURI = function downloadURI(uri, name) {
        var linkurl = document.createElement('a');
        linkurl.download = name;
        linkurl.href = uri;
        document.body.appendChild(linkurl);
        linkurl.click();
        document.body.removeChild(linkurl);
        //delete linkurl;
      };

      var dataURL = getRootStage().toDataURL();

      var doc = new jsPDF('l','pt','a4'); // This part is your mistake
      //doc.text(20, 20, 'Hello world.');
      doc.addImage(dataURL, 'JPEG', 0, 0);
      doc.save('olm_diagram.pdf');
      //downloadURI(dataURL, 'olm_diagram.png');
    },

    zoomSliderChange(value){
      //console.log('message', ' zoomSliderChange  ' + value);
      // todo: future we implement this feature
      this.set('zoomRangeValue', value);
    },

    saveDiagram() {

      let alldata = getEvents();
      let context = this;

      let endpointformatteddata = [];
      for (let c = 0; c < alldata.length; c++) {
        let dataObject = {
          startState: '',
          endState: '',
          extra: '',
          classType: this.get('classTypeId'),
          actioneventid: '',
          roles: '',

        };

        let cordinateStart = alldata[c].start.children[0].getAttr('x') + "::" + alldata[c].start.children[0].getAttr('y') + "::" + alldata[c].startconnectedpoint;
        let cordinateEnd = alldata[c].end.children[0].getAttr('x') + "::" + alldata[c].end.children[0].getAttr('y') + "::" + alldata[c].endconnectedpoint;

        let cordinates = cordinateStart + ":::" + cordinateEnd;

        dataObject.startState = alldata[c].start.getAttr('id');
        dataObject.endState = alldata[c].end.getAttr('id');
        dataObject.actioneventid = alldata[c].group.getAttr('eventid');
        dataObject.roles = alldata[c].group.getAttr('roles').toString();
        //dataObject.roles=1;
        dataObject.extra = cordinates;
        endpointformatteddata.push(dataObject);


      }

      console.log('endpointformatteddata', endpointformatteddata);

      let allStates = getStates();


      let statesArr = [];

      for (let c = 0; c < allStates.length; c++) {
        let stateid = parseInt(allStates[c].getAttr('id'));

        let type = allStates[c].getAttr('name').toLowerCase();

        if (type !== 'start' && type !== 'end') {
          let diagramData = {
            stateid: stateid,
            edit: allStates[c].getAttr('edit'),
            view: allStates[c].getAttr('view')
          };
          statesArr.push(diagramData);
        }
      }
      let diagramData = {
        edges: endpointformatteddata,
        roles: statesArr
      };

      for (let c6 = 0; c6 < diagramData.roles.length; c6++) {
        if (!diagramData.roles[c6].stateid) {
          //alert("State id is missing");

          context.get('notifier').warning('State id is missing');
          return;
        }
      }


      this.olmSetupService.saveDiagram(diagramData)
        .then(function (msg) {
          context.get('notifier').danger('Failed To Save Workflow Diagram');
        })
        .catch(function (msg) {

        if(msg.status === 201){
          context.get('notifier').success('Successfully Save Workflow Diagram');
        }else{
          context.get('notifier').danger('Failed To Save Workflow Diagram');
        }
      })

    },
    selectState(s) {
      this.set('state', s);
    },
    selectEvent(e) {
      this.set('event', e);
    },

    submitForm() {
      let role = [];

      let event = $(".event-opt:selected").val();
      let roleNames = [];
      $(".role-opt:selected").each(function () {

        role.push($(this).val());
        roleNames.push($(this).html());
      });
      let selectedObj = getSelectedObject();
      //first change it on the array
      let eventName = $(".event-opt:selected").html();

      if (selectedObj != null) {
        selectedObj.setAttr("eventid", event);
        selectedObj.setAttr("roles", role);
        selectedObj.children[1].setAttr("text", "<" + eventName + ">");
        selectedObj.children[2].setAttr("text", "[" + roleNames.toString() + "]");
        selectedObj.children[2].setOffset({
          x: selectedObj.children[2].getWidth() / 2
        });

        this.l.draw();


      }
      $(".form").hide();
    },
    submitStateForm() {
      let state = $(".state-opt:selected").val();

      let selectedObj = getSelectedObject();
      let view = [];
      let edit = [];
      let viewNames = [];
      let editNames = [];

      $(".view-opt:selected").each(function () {

        view.push($(this).val());
        viewNames.push($(this).html())
      });
      $(".edit-opt:selected").each(function () {

        edit.push($(this).val());
        editNames.push($(this).html());

      });


      let del = this.get('delete');
      let text = "V: " + viewNames.toString() + "\n\n" + "E: " + editNames.toString() + "\n\n" + "D: " + del;

      let stateName = $(".state-opt:selected").html();


      //first change it on the array
      if (selectedObj != null) {

        selectedObj.setAttr("name", stateName);
        selectedObj.setAttr("id", state);
        selectedObj.setAttr("view", view);
        selectedObj.setAttr("edit", edit);
        selectedObj.children[1].setAttr("text", stateName);
        selectedObj.children[1].setOffset({
          x: selectedObj.children[1].getWidth() / 2,
          y: selectedObj.children[1].getHeight() / 2
        });
        selectedObj.children[7].setAttr("text", text);
        selectedObj.children[6].setAttr("height", selectedObj.children[7].getHeight());
        selectedObj.children[7].setAttr("y", selectedObj.children[0].getAttr("y") - selectedObj.children[7].getHeight() - 45);
        selectedObj.children[6].setAttr("y", selectedObj.children[0].getAttr("y") - selectedObj.children[7].getHeight() - 45);


        this.l.draw();
        $('select#view option').removeAttr("selected");
        $(".form").hide();
      }
    },

  },

  event: '',
  role: '',
  roleNames: '',
  state: '',
  l: null,

  view: '',
  viewNames: '',
  edit: '',
  editNames: '',
  delete: '',
  init() {
    this._super(...arguments);


    this.set('zoomRangeValue', 100);

    setContext(this);
    this.loadInitialData();
  },

  loadInitialData() {

    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();
    let engineCode = "olm";
    let allCreatedClassTypes = this.olmSetupService.getAllClassType(orgCode,appCode,engineCode,accessToken);
    allCreatedClassTypes.then(function (msg) {
      console.log('message--classtypes---', msg.data);
      context.set('classtypes', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load OLM Objects');
    });


    let allCreatedActionEvents = this.olmSetupService.getAllActionEvents(accessToken);
    allCreatedActionEvents.then(function (msg) {
      context.set('actionevents', msg.data);
    }).done(function (data) {
      context.loadRoles();
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Action Events');
    });


  },
  loadRoles() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedClassTypes = this.olmSetupService.getAllRoles(accessToken);
    allCreatedClassTypes.then(function (msg) {
      context.set('roles', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Roles');
    });

  },


  didInsertElement() {


    let width = $(".parent-container").width();
    let height = 600;
    let circle = $("#circle");
    let connect = $("#connect");

    let ellipse = $("#ellipse");
    let hand = $("#hand");
    let start = $("#start");
    let end = $("#end");
    let circularedge = $("#circularedge");
    let remove = $("#remove");
    let action = 0;

    //tools change
    circle.on("click", function () {
      action = 1;
      setRemove(false);
      $(".active-tool").removeClass("active-tool");
      circle.addClass("active-tool");


    });

    connect.on("click", function () {

      action = 2;
      setRemove(false);
      $(".active-tool").removeClass("active-tool");
      connect.addClass("active-tool");

    });
    hand.on("click", function () {

      console.log('getStates', getStates());


      action = 3;
      setRemove(false);
      $(".active-tool").removeClass("active-tool");
      hand.addClass("active-tool");
    });
    ellipse.on("click", function () {

      action = 4;
      setRemove(false);
      $(".active-tool").removeClass("active-tool");
      ellipse.addClass("active-tool");


    });
    let cancel = false;
    $("#cancel-btn").click(function () {
      cancel = true;
      $(".diagram-modal-container").fadeOut();
      $(".color").unbind();

    });
    circularedge.on("click", function () {

      action = 5;
      setRemove(false);
      $(".active-tool").removeClass("active-tool");
      circularedge.addClass("active-tool");
    });
    start.on("click", function () {
      action = 6;
      setRemove(false);
      $(".active-tool").removeClass("active-tool");
      start.addClass("active-tool");

    });

    end.on("click", function () {
      action = 7;
      setRemove(false);
      $(".active-tool").removeClass("active-tool");
      end.addClass("active-tool");

    });
    remove.on("click", function () {
      action = 8;
      setRemove(true);
      $(".active-tool").removeClass("active-tool");
      remove.addClass("active-tool");
    });


    // Konva setup
    let stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
      draggable: true,
      x: 0,
      y: 0
    });
    let layer = new Konva.Layer();
    this.l = layer;


    // resize window adjustment
    /*fitStageIntoParentContainer(container, stage,width,height);
    // adapt the stage on any window resize
    window.addEventListener('resize',function () {
      let width = window.innerWidth;
      let height = window.innerHeight;
      fitStageIntoParentContainer(container, stage,width,height);
    });*/

    setStageLayer(stage, layer);


    stage.on("mousemove", function () {

      if (action === 2) {
        connecthelper();
      }
    });



    let context = this;


    // zoom in zoom out
    let scaleBy = 1.1;
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      let oldScale = stage.scaleX();
      let mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };

      let newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({x: newScale, y: newScale});

      let newPos = {
        x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
        y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
      };
      stage.position(newPos);
      stage.batchDraw();
      //console.log('(relative stage position)', newPos);
      setPOS(newPos);
    });



    stage.on("dragmove",function () {
      let stagePos=stage.position();
      setPOS(stagePos);
    });


    stage.on("click", function () {
      let mousePos;
      let oldScale = stage.scaleX();
      if (getPOS() == null) {
        mousePos = stage.getPointerPosition();
        handleClick(mousePos, action);
      } else {
        let mousePos = stage.getPointerPosition();
        let position = {
          x: (mousePos.x / oldScale - getPOS().x / oldScale),
          y: (mousePos.y / oldScale - getPOS().y / oldScale)
        };
        handleClick(position, action);
      }
    });




  },

  loadDataByClassTypeId(classTypeId) {


    let mydata = [];
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let classTypeById = this.olmSetupService.getClassTypeById(classTypeId, accessToken);

    classTypeById.then(function (result) {
      //context.set('stateList', msg.data);
      let states = result.data.attributes.states;
      context.set('states', states);
      console.log('message-data', result.data);

      let startStateId;
      let endStateId;
      let startfound = false;
      let endFound = false;
      for (let c = 0; c < states.length; c++) {
        //start end id
        if (states[c].code.toLowerCase() === 'start') {
          startStateId = states[c].id;
          startfound = true;
        } else if (states[c].code.toLowerCase() === 'end') {
          endStateId = states[c].id;
          endFound = true;
        }
        if (startfound && endFound) {
          break;
        }
      }
      setStartEndIds(startStateId, endStateId);

      let diagramResult = result.data.attributes;
      let edges = result.data.attributes.egdes;

      if (edges.length > 0 ) {

        for (let c = 0; c < edges.length; c++) {
          let l = edges[c].extra;
          //console.log('edges', l);
          let cordinates = l.split(":::");

          let start = cordinates[0].split("::");
          let end = cordinates[1].split("::");


          let mydataobject = {

            startChild: start[2],
            endChild: end[2],

            id: edges[c].id,
            startState: {
              id: edges[c].startState.id,
              name: edges[c].startState.name,
              cordinate: {
                x: start[0],
                y: start[1],

              },
              edit: {
                id: '',
                name: ''
              },
              view: {
                id: '',
                name: ''
              }
            },
            endState: {
              id: edges[c].endState.id,
              name: edges[c].endState.name,
              cordinate: {
                x: end[0],
                y: end[1],

              },
              edit: {
                id: '',
                name: ''
              },
              view: {
                id: '',
                name: ''
              }
            },
            actionevent: {
              id: edges[c].actionEvent.id,
              name: edges[c].actionEvent.name
            },
            roles: ''
          };

          let roles = [];

          for (let c5 = 0; c5 < edges[c].roles.length; c5++) {
            let roleObj = {
              id: edges[c].roles[c5].id,
              name: edges[c].roles[c5].name
            };
            roles.push(roleObj);


          }
          mydataobject.roles = roles;

          let startstateviewid = [];
          let startstateviewnames = [];
          let startstateeditid = [];
          let startstateeditnames = [];
          let endstateviewid = [];
          let endstateviewnames = [];
          let endstateeditid = [];
          let endtstateeditnames = [];

          for (let c2 = 0; c2 < diagramResult.crudActionEventMapping.length; c2++) {

            if (diagramResult.crudActionEventMapping[c2].state.id == mydataobject.startState.id) {
              let roleId = diagramResult.crudActionEventMapping[c2].role.id;
              let rolename = diagramResult.crudActionEventMapping[c2].role.name;
              if (diagramResult.crudActionEventMapping[c2].crudActionEvent.id == 1) {
                startstateviewid.push(roleId);
                startstateviewnames.push(rolename);
              } else if (diagramResult.crudActionEventMapping[c2].crudActionEvent.id == 2) {
                startstateeditid.push(roleId);
                startstateeditnames.push(rolename);
              }

            } else if (diagramResult.crudActionEventMapping[c2].state.id == mydataobject.endState.id) {
              let roleId = diagramResult.crudActionEventMapping[c2].role.id;
              let rolename = diagramResult.crudActionEventMapping[c2].role.name;
              if (diagramResult.crudActionEventMapping[c2].crudActionEvent.id == 1) {
                endstateviewid.push(roleId);
                endstateviewnames.push(rolename);
              } else if (diagramResult.crudActionEventMapping[c2].crudActionEvent.id == 2) {
                endstateeditid.push(roleId);
                endtstateeditnames.push(rolename);
              }
            }


          }

          if (mydataobject.startState.id != 1 && mydataobject.startState.id != 2) {
            mydataobject.startState.view.id = startstateviewid;
            mydataobject.startState.view.name = startstateviewnames;
            mydataobject.startState.edit.id = startstateeditid;
            mydataobject.startState.edit.name = startstateeditnames;
          }
          if (mydataobject.endState.id != 1 && mydataobject.endState.id != 2) {
            mydataobject.endState.view.id = endstateviewid;
            mydataobject.endState.view.name = endstateviewnames;
            mydataobject.endState.edit.id = endstateeditid;
            mydataobject.endState.edit.name = endtstateeditnames;
          }

          mydata.push(mydataobject);


        }

      }

      init(mydata);   //
      context.set('colors', getStateColors());

    });



  },

  stateColorPushBack(color) {
    this.get('colors').pushObject(color);

    //console.log('message', ' hi how are you');
  }

});
