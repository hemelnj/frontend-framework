import $ from 'jquery';


var stage;
var layer;
var connectedCircleDefaultColor = "black";
var ellipseFillColor = "#00ccff";
var circularEdgecolor = "black";
var startStateColor = "#2ec94f";
var endStateColor = "black";
var states = [];


var mousePosPrev = {
  x: null,
  y: null
};
var secondClick = false;
var isClickedOnConnectCircle = false;
var connectCircleStart = null;
var connectCircleEnd = null;

var circleArray = [];
var ellipseArray = [];
var events = [];
var arrowTest;
var remove = false;
var startStateId=0;
var endStateId=0;

var clickedConnectedCircleType = 0;
var drawLineTest = false;
var selectedObject = null;
//var stateColors = ['#00ccff', '#9fad01', '#6d2828', '#6d3d28', '#9e4119', '#8c7028', '#84795b', '#84655b', '#33847c', '#006057', '#112a60', '#344b7c', '#6c2f91'];
var stateColors = [];
var eventform = {

  container: 'form-for-event',
  event: 'event',
  role: 'role'
};
var stateform = {
  container: 'form-for-state',
  state: 'state'
}
var crudform = {
  container: 'form-for-crud',
  crudstate: 'crudstate',
  view: 'view',
  edit: 'edit',
  delete: 'delete'

}

var view = null;


export function getStateColors() {

  return stateColors;
}


export function setStartEndIds(start,end)
{
   startStateId=start;
   endStateId=end;

}
export function setStageLayer(s, l) {
  stage = s;
  layer = l;
}


function setStateRemoveColor(fillColor) {

  view.stateColorPushBack(fillColor );
}

// clear previous activity
function clearAll() {



  for (let c = 0; c < states.length; c++) {
    states[c].destroy();
  }
  for (let c = 0; c < events.length; c++) {

    //console.log(events[c]);
    if(events[c] !=null)
    {
      events[c].end.destroy();
      events[c].group.destroy();
      events[c].start.destroy();
    }

  }

  layer.draw();
  states=[];
  events=[];
  stage.clear();
  stage.clearCache();
}


export function init(arr) {

  clearAll();
  //console.log('message---------------------init-array', arr);

  stateColors = ['#00ccff', '#9fad01', '#6d2828', '#6d3d28', '#9e4119', '#8c7028', '#84795b', '#84655b', '#33847c', '#006057', '#112a60', '#344b7c', '#6c2f91', '#00ccff', '#9fad01', '#6d2828', '#6d3d28', '#9e4119', '#8c7028', '#84795b', '#84655b', '#33847c', '#006057', '#112a60', '#344b7c', '#6c2f91'];


  if (arr.length == 0) {
    return;
  }

  var statearr = [];

  for (var c = 0; c < arr.length; c++) {
    let id = arr[c].startState.id;
    var flagforstart = true;
    for (var c2 = 0; c2 < statearr.length; c2++) {
      if (statearr[c2].id == id) {
        flagforstart = false;
        break;
      }
    }

    if (flagforstart) {
      statearr.push(arr[c].startState);
    }
    flagforstart = true;

    id = arr[c].endState.id;
    var flagFoEnd = true;
    for (var c3 = 0; c3 < statearr.length; c3++) {
      if (statearr[c3].id == id) {
        flagFoEnd = false;
        break;
      }
    }

    if (flagFoEnd) {
      statearr.push(arr[c].endState);

    }
    flagFoEnd = true;

  }

  //console.log('----state array----', statearr);
  //console.log('message-startStateId', startStateId);


  for (var c4 = 0; c4 < statearr.length; c4++) {
    //console.log('message---statearr[c4].id', statearr[c4].id);

    if (statearr[c4].id == startStateId) {

      let x = parseInt(statearr[c4].cordinate.x);
      let y = parseInt(statearr[c4].cordinate.y);

      //console.log('message---drawing something', startStateId);
      drawCircle(x, y, "start");


    } else if (statearr[c4].id == endStateId) {

      let x = parseInt(statearr[c4].cordinate.x);
      let y = parseInt(statearr[c4].cordinate.y);

      drawCircle(x, y, "end");
    } else {

      //fetch other information from server


      let x = parseInt(statearr[c4].cordinate.x);
      let y = parseInt(statearr[c4].cordinate.y);
      ellipseFillColor = stateColors[0];
      stateColors.splice(0, 1);

      var ellipse = drawEllipse(x, y);
      ellipse.setAttr("id", statearr[c4].id);
      ellipse.children[1].setAttr('text', statearr[c4].name);
      ellipse.children[1].setOffset({
        x: ellipse.children[1].getWidth() / 2,
        y: ellipse.children[1].getHeight() / 2
      });


      let text = "V: " + statearr[c4].view.name.toString() + "\n\n" + "E: " + statearr[c4].edit.name.toString() + "\n\n" + "D: disabled";
      ellipse.setAttr("view", statearr[c4].view.id);
      ellipse.setAttr("edit", statearr[c4].edit.id);
      ellipse.children[7].setAttr("text", text);
      ellipse.children[6].setAttr("height", ellipse.children[7].getHeight());
      ellipse.children[7].setAttr("y", ellipse.children[0].getAttr("y") - ellipse.children[7].getHeight() - 45);
      ellipse.children[6].setAttr("y", ellipse.children[0].getAttr("y") - ellipse.children[7].getHeight() - 45);


      states.push(ellipse);

    }
  }
  //console.log('message array ', arr);

  for (c = 0; c < arr.length; c++) {
    let startChild;
    let endChild;

    for (c2 = 0; c2 < states.length; c2++) {
      //Logger.debug();
      //console.log('message', parseInt(states[c2].getAttr("id")) );
      if (parseInt(arr[c].startState.id) == parseInt(states[c2].getAttr("id"))) {


        if (parseInt(arr[c].startState.id) == startStateId || parseInt(arr[c].startState.id == endStateId)) {

          startChild = states[c2].children[parseInt(arr[c].startChild)];

        } else {
          startChild = states[c2].children[parseInt(arr[c].startChild) + 1];
        }

      } else if (parseInt(arr[c].endState.id) == parseInt(states[c2].getAttr("id"))) {

        if (parseInt(arr[c].endState.id) == startStateId || parseInt(arr[c].endState.id) == endStateId) {


          endChild = states[c2].children[parseInt(arr[c].endChild)];

        } else {
          endChild = states[c2].children[parseInt(arr[c].endChild) + 1];
        }
      }

    }


    drawLineHandler(startChild, endChild, arr[c].actionevent.name, arr[c].actionevent.id, arr[c].roles);

  }


}

export function getEventsForDB() {
  let evensfordb = [];

  for (var c = 0; c < events.length; c++) {
    let eventfordb = {
      name: "n/a",
      id: 1,
      extra: "n/a",
      code: "n/a",
      createdBy: "1",
      description: "n/a",
      comments: "11",
      lastUpdatedBy: "msi",
      createdAt: 1,
      lastUpdatedAt: 1,
      roles: [],
      classType: {
        id: 1
      },
      startState: events[c].start,
      endState: events[c].end,
      actionEvent: ''

    }

    //now push all roles
    //push the action event id
    //extract data from start and end node and update it

    evensfordb.push(eventfordb);
  }
  return evensfordb;
}

export function getStatesForDB() {
  let statesfordb = [];
  for (var c = 0; c < states.length; c++) {
    let statefordb = {
      name: states[c].getAttr("name"),
      id: 1,
      mEndEdges: [],
      startEdges: [],
      classType: {
        name: "N/A",
        id: "N/A"
      },
      extra: "N/A",
      code: "N/A",
      comments: "N/A",
      description: "N/A",
      createdAt: new Date().toDateString(),
      lastupdatedAt: new Date().toDateString(),
      createdBy: "11",
      lastUpdatedBy: "1",


    };

    for (var c1 = 0; c1 < events.length; c1++) {
      if (events[c1].start == states[c]) {
        statefordb.startEdges.push(events[c1].group);
      } else if (events[c1].end == states[c]) {
        statefordb.mEndEdges.push(events[c1].group);
      }
    }
    statesfordb.push(statefordb);

  }
  return statesfordb;
}

export function getStates() {

  return states;
}

export function getEvents() {
  return events;
}

export function setContext(c) {
  view = c;
}

export function getSelectedObject() {
  return selectedObject;
}

export function setEllipseColor(color) {
  ellipseFillColor = color;
}

export function getDrawLineTest() {
  return drawLineTest;
}

export function getconnectCircleStart() {
  return connectCircleStart;
}

export function getTempArrow() {
  return arrowTest;
}

export function setTempArrow(arrow) {
  arrowTest = arrow;
}

export function setRemove(r) {
  remove = r;
}


export function connecthelper() {
  if (drawLineTest) {
    if (arrowTest != null) {
      arrowTest.destroy();
      layer.draw();
    }
    var mousePos = stage.getPointerPosition();
    var scale = stage.scaleX();
    if (connectCircleStart.getAttrs().x > (mousePos.x - stage.attrs.x)) {
      arrowTest = drawLine(connectCircleStart.getAttrs().x, connectCircleStart.getAttrs().y, (mousePos.x/scale - stage.attrs.x/scale) + 5, (mousePos.y/scale - stage.attrs.y/scale), 0);
      console.log('message-inside IF');
    } else {
      arrowTest = drawLine(connectCircleStart.getAttrs().x, connectCircleStart.getAttrs().y, (mousePos.x/scale - stage.attrs.x/scale) - 5, (mousePos.y/scale - stage.attrs.y/scale), 0);
      console.log('message-inside ELSE');

      // p5 is need to calibrate. so that when drawing finish then arrow draw properly.
    }

  }
}


function drawLineHandler(connectCircleStart, connectCircleEnd, eventName, id, roles) {

  //console.log('connect circle is  start ', connectCircleStart);
  //console.log('message',connectCircleEnd);
  let rolesId = [];
  let rolesName = [];
  for (var c5 = 0; c5 < roles.length; c5++) {
    rolesId.push(roles[c5].id);
    rolesName.push(roles[c5].name);

  }
  var edgegroup = drawLine(connectCircleStart.getAttrs().x, connectCircleStart.getAttrs().y, connectCircleEnd.getAttrs().x, connectCircleEnd.getAttrs().y, 1);

  edgegroup.children[1].setAttr("text", "<" + eventName + ">");
  edgegroup.setAttr("eventid", id);
  edgegroup.setAttr("roles", rolesId);
  edgegroup.children[2].setAttr("text", "[" + rolesName.toString() + "]");
  edgegroup.children[2].setOffset({
    x: edgegroup.children[2].getWidth() / 2
  });


  layer.draw();
  var event = {

    group: edgegroup,
    start: connectCircleStart.getParent(),
    end: connectCircleEnd.getParent(),
    startconnectedpoint: '',
    endconnectedpoint: ''
  };


  for (var c = 0; c < connectCircleStart.getParent().children.length; c++) {
    if (connectCircleStart.getParent().children[c] == connectCircleStart) {
      if (connectCircleStart.getParent().children.length == 8) {
        event.startconnectedpoint = c - 1;
      } else {
        event.startconnectedpoint = c;
      }
      break;
    }
  }

  for (var c2 = 0; c2 < connectCircleEnd.getParent().children.length; c2++) {
    if (connectCircleEnd.getParent().children[c2] == connectCircleEnd) {
      if (connectCircleEnd.getParent().children.length == 8) {
        event.endconnectedpoint = c2 - 1;
      } else {
        event.endconnectedpoint = c2;
      }
      break;
    }
  }

  events.push(event);


}

export function handleClick(mousePos, action) {

  if (action == 0) {
    //
  } else if (action == 1) {
    //createCircle(context,mousePos.x,mousePos.y);

    drawCircle(mousePos.x, mousePos.y, "start");

  } else if (action == 2) {

    //is clicked on connector circles
    if (isClickedOnConnectCircle) {


      isClickedOnConnectCircle = false;
      if (secondClick) {


        if (connectCircleStart != connectCircleEnd) {
          drawLineTest = false;
          arrowTest.destroy();
          layer.draw();

          var edgegroup = drawLine(connectCircleStart.getAttrs().x, connectCircleStart.getAttrs().y, connectCircleEnd.getAttrs().x, connectCircleEnd.getAttrs().y, 1);


          var event = {

            group: edgegroup,
            start: connectCircleStart.getParent(),
            end: connectCircleEnd.getParent(),
            startconnectedpoint: '',
            endconnectedpoint: ''
          };


          for (var c = 0; c < connectCircleStart.getParent().children.length; c++) {
            if (connectCircleStart.getParent().children[c] == connectCircleStart) {
              if (connectCircleStart.getParent().children.length == 8) {
                event.startconnectedpoint = c - 1;
              } else {
                event.startconnectedpoint = c;
              }
              break;
            }
          }

          for (var c2 = 0; c2 < connectCircleEnd.getParent().children.length; c2++) {
            if (connectCircleEnd.getParent().children[c2] == connectCircleEnd) {
              if (connectCircleEnd.getParent().children.length == 8) {
                event.endconnectedpoint = c2 - 1;
              } else {
                event.endconnectedpoint = c2;
              }
              break;
            }
          }

          events.push(event);


          //setting the default value after completing the drawing
          //connectCircleStart.fill(connectedCircleDefaultColor);
          //connectCircleEnd.fill(connectedCircleDefaultColor);
          layer.draw();
          connectCircleStart = null;
          connectCircleEnd = null;
          secondClick = false;


        } else {
          connectCircleEnd = null;
        }
      } else {
        drawLineTest = true;
        mousePosPrev.x = mousePos.x;
        mousePosPrev.y = mousePos.y;
        secondClick = true;
      }
    } else {
      if (drawLineTest) {
        drawLineTest = false;
        arrowTest.destroy();
        layer.draw();
      }
    }
  } else if (action == 4) {

    $(".diagram-modal-container").fadeIn();

    $(".color").click(function () {

      //Ember.set('ellipseFillColor', $(this).css(Ember.String.htmlSafe("color: blue;")));

      ellipseFillColor = $(this).css("background-color");
      $(".diagram-modal-container").fadeOut();
      $(this).remove();
      var ellipse = drawEllipse(mousePos.x, mousePos.y);
      states.push(ellipse);
      $(".color").unbind();
    });


  } else if (action == 5) {
    if (isClickedOnConnectCircle) {
      isClickedOnConnectCircle = false;
      drawCircularEdge(connectCircleStart.getAttrs().x, connectCircleStart.getAttrs().y, clickedConnectedCircleType);
      clickedConnectedCircleType = 0;
      connectCircleStart.fill(connectedCircleDefaultColor);
      layer.draw();
    }

  } else if (action == 6) {
    drawCircle(mousePos.x, mousePos.y, "start");
  } else if (action == 7) {
    drawCircle(mousePos.x, mousePos.y, "end");
  }
}

//function for drawing line

export function drawLine(fromX, fromY, toX, toY, type) {

  //  console.log(fromX+" "+fromY+" "+toX+" "+toY);


  var midx = (fromX + toX) / 2;
  var midy = (fromY + toY) / 2;
  var edgegroup = new Konva.Group({

    properties: {
      roles: ['', ''],
      event: ""
    },
    eventid: '',
    roles: ''
  });

  var arrow = new Konva.Arrow({
    x: 0,
    y: 0,
    points: [fromX, fromY, toX, toY],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 2,

  });

  var eventText = new Konva.Text({
    x: midx,
    y: midy + 5,
    text: '<Select event >',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'Black'
  });
  eventText.setOffset({
    x: eventText.getWidth() / 2
  });


  var roleText = new Konva.Text({
    x: midx,
    y: midy - 30,
    text: '[Select role]',
    fontSize: 12,
    fontFamily: 'Calibri',
    fill: 'Black'
  });
  roleText.setOffset({
    x: roleText.getWidth() / 2
  });


  edgegroup.on("click", function () {


    if (remove) {
      for (var c = 0; c < events.length; c++) {
        if (events[c].group == edgegroup) {
          events.splice(c, 1);
        }
      }
      this.destroy();
      layer.draw();
    } else {
      selectedObject = this;


      $(".form").hide();
      $("." + eventform.container).show();


    }


  })
  edgegroup.on("mouseover", function () {
    stage.container().style.cursor = 'pointer';
  })
  edgegroup.on('mouseleave', function () {
    stage.container().style.cursor = 'default';
  });


  edgegroup.add(arrow);
  if (type == 1) {
    edgegroup.add(eventText);
    edgegroup.add(roleText);
  }


  layer.add(edgegroup);
  stage.add(layer);
  return edgegroup;

}

export function drawCircle(x, y, type) {

  var radius = 40;
  var smallRadius = 5;
  var name = "Start";
  let id = 1;
  var fill = startStateColor;
  if (type == "start") {
    fill = startStateColor;
    id = startStateId;

  } else if (type == "end") {
    fill = endStateColor
    name = "End";
    id = endStateId;
  }
  var circleGroup = new Konva.Group({
    name: type,
    id: id
  });


  var circle = new Konva.Circle({
    x: x,
    y: y,
    radius: radius,
    fill: fill,
    strokeWidth: 2
  });

  var rightCircle = new Konva.Circle({
    x: x + radius,
    y: y,
    radius: smallRadius,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1
  });
  var leftCircle = new Konva.Circle({
    x: x - radius,
    y: y,
    radius: smallRadius,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1
  });
  var topCircle = new Konva.Circle({
    x: x,
    y: y - radius,
    radius: smallRadius,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1
  });
  var bottomCircle = new Konva.Circle({
    x: x,
    y: y + radius,
    radius: smallRadius,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1
  });

  var stateName = new Konva.Text({
    x: x,
    y: y,
    text: name,
    fontSize: 15,
    fontFamily: 'Calibri',
    fill: 'White'
  });
  stateName.setOffset({
    x: stateName.getWidth() / 2,
    y: stateName.getHeight() / 2
  });

  //add click events

  circle.on('click', function () {


    if (remove) {

      for (var c = 0; c < states.length; c++) {
        if (states[c] == circleGroup) {

          states.splice(c, 1);

          break;
        }
      }
      //let deleteevents=[];
      for (var c = 0; c < events.length; c++) {
        if (events[c].start == circleGroup || events[c].end == circleGroup) {

          let e = events[c].group;
          events.splice(c, 1);
          e.destroy();
          c--;
        }
      }
      circleGroup.destroy();
      layer.draw();
    }

  });
  rightCircle.on('click', function () {

    //changecircleColor(this);
    isClickedOnConnectCircle = true;

    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }

  });

  rightCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  });

  rightCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });


  leftCircle.on('click', function () {

    //changecircleColor(this);
    isClickedOnConnectCircle = true;
    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }


  });

  leftCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  });

  leftCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });
  topCircle.on('click', function () {

    //changecircleColor(this);
    isClickedOnConnectCircle = true;

    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }

  });
  topCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  })

  topCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });

  bottomCircle.on('click', function () {

    // changecircleColor(this);
    isClickedOnConnectCircle = true;

    clickedConnectedCircleType = 1;
    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }

  });

  bottomCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  });

  bottomCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });


  circleGroup.add(circle);
  circleGroup.add(rightCircle);//1
  circleGroup.add(leftCircle);//2
  circleGroup.add(topCircle);//3
  circleGroup.add(bottomCircle);//4

  circleGroup.add(stateName);

  layer.add(circleGroup);
  stage.add(layer);

//  circle.fire('click');


  states.push(circleGroup);
}


//funtion that is used to draw a circular edge


export function drawEllipse(x, y) {

  var radiusx = 80;
  var radiusy = 40;
  var smallRadius = 5;

  var ellipseGroup = new Konva.Group({
    name: '',
    id: '',
    view: '',
    edit: ''
  });


  var ellipse = new Konva.Ellipse({
    x: x,
    y: y,
    radius: {
      x: radiusx,
      y: radiusy
    },
    fill: ellipseFillColor,

    strokeWidth: 2
  });

  var rightCircle = new Konva.Circle({
    x: x + radiusx,
    y: y,
    radius: smallRadius,
    fill: 'rgba(204, 153, 255,0)',
    stroke: 'rgba(204, 153, 255,0)',
    strokeWidth: 1
  });
  var leftCircle = new Konva.Circle({
    x: x - radiusx,
    y: y,
    radius: smallRadius,
    fill: 'rgba(204, 153, 255,0)',
    stroke: 'rgba(204, 153, 255,0)',
    strokeWidth: 1
  });
  var topCircle = new Konva.Circle({
    x: x,
    y: y - radiusy,
    radius: smallRadius,
    fill: 'rgba(204, 153, 255,0)',
    stroke: 'rgba(204, 153, 255,0)',
    strokeWidth: 1
  });
  var bottomCircle = new Konva.Circle({
    x: x,
    y: y + radiusy,
    radius: smallRadius,
    fill: 'rgba(204, 153, 255,0)',
    stroke: 'rgba(204, 153, 255,0)',
    strokeWidth: 1
  });

  var stateName = new Konva.Text({
    x: x,
    y: y,
    text: "",
    fontSize: 15,
    fontFamily: 'Calibri',
    fill: 'White'
  });
  stateName.setOffset({
    x: stateName.getWidth() / 2,
    y: stateName.getHeight() / 2
  });

  var crudText = new Konva.Text({
    x: x - 50,
    y: y - (radiusy + 80),
    text: 'V : Select \n\n E: Select \n\n D: Disabled',
    fontSize: 10,
    fontFamily: 'Calibri',
    fill: 'black',
    width: 110,
    padding: 10,

    align: 'left'
  });

  var rect = new Konva.Rect({
    x: x - 50,
    y: y - (radiusy + 80),
    stroke: 'black',
    strokeWidth: 1,
    fill: 'white',
    width: 120,
    height: crudText.getHeight()
  });


  ellipseGroup.on("mouseover", function () {

    rightCircle.setAttr('fill', 'black');
    leftCircle.setAttr('fill', 'black');
    topCircle.setAttr('fill', 'black');
    bottomCircle.setAttr('fill', 'black');
    layer.draw();

  });
  ellipseGroup.on("mouseout", function () {


    rightCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
    topCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
    bottomCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
    leftCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
    layer.draw();
  });

  ellipseGroup.on("click", function () {


    console.log('state--selected--color',   this.getChildren()[0].getAttr('fill') );
    let fillColor = this.getChildren()[0].getAttr('fill');


    if (remove) {
      for (var c = 0; c < states.length; c++) {
        if (states[c] == ellipseGroup) {

          states.splice(c, 1);

          break;
        }
      }

      for (var c = 0; c < events.length; c++) {

        if (events[c].start == ellipseGroup || events[c].end == ellipseGroup) {

          let e = events[c].group;
          events.splice(c, 1);
          e.destroy();
          c--;

        }
      }


      setStateRemoveColor(fillColor);


      this.destroy();
      layer.draw();
    } else {
      selectedObject = this;
      $(".form").hide();
      $("." + stateform.container).show();
      let s = selectedObject.children[1].attrs.text;
      let text = selectedObject.children[7].attrs.text.split("\n\n");

      let v = text[0].split(":")[1].trim();
      let e = text[1].split(":")[1].trim();
      let d = text[2].split(":")[1].trim();


      view.setProperties({
        state: s,
        view: v,
        edit: e,
        delete: d


      });


    }
  });

  rightCircle.on('click', function () {

    //changecircleColor(this);
    isClickedOnConnectCircle = true;

    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }

  });

  rightCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  });

  rightCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });


  leftCircle.on('click', function () {

    //changecircleColor(this);
    isClickedOnConnectCircle = true;
    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }


  });

  leftCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  });

  leftCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });
  topCircle.on('click', function () {

    //changecircleColor(this);
    isClickedOnConnectCircle = true;

    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }

  });
  topCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  });

  topCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });

  bottomCircle.on('click', function () {

    //changecircleColor(this);
    isClickedOnConnectCircle = true;

    clickedConnectedCircleType = 1;
    if (!secondClick) {
      connectCircleStart = this;
    } else {
      connectCircleEnd = this;
    }

  });

  bottomCircle.on('mouseover', function () {

    this.attrs.radius = 8;
    layer.draw();

  });

  bottomCircle.on('mouseout', function () {

    this.attrs.radius = 5;
    layer.draw();

  });

  //zoomRelatively();


  ellipseGroup.add(ellipse);
  ellipseGroup.add(stateName); //second child with index 1
  ellipseGroup.add(rightCircle);
  ellipseGroup.add(leftCircle);
  ellipseGroup.add(topCircle);
  ellipseGroup.add(bottomCircle);
  ellipseGroup.add(rect);
  ellipseGroup.add(crudText);


  layer.add(ellipseGroup);
  stage.add(layer);

  ellipse.fire('click');

  return ellipseGroup;
  //states.push(ellipseGroup);


}


function zoomRelatively() {

  /*-- zoom range input  --*/
  /*var slider = $("#zoomRange");
  var output = $("#zoomRangeValue");
  output.html( slider.val() );

  slider.on("change mousemove", function () {
    output.html(this.value);
  });*/


  var scaleBy = 1.01;
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    var oldScale = stage.scaleX();

    var mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    var newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    };
    stage.position(newPos);
    stage.batchDraw();
  });


}


let d;
export function setPOS(stagePos){
  d = stagePos;
}

export function getPOS(){
  return d;
}


export function fitStageIntoParentContainer(container, stage,stageWidth,stageHeight) {

  console.log('width ',stageWidth,' height ',stageHeight);
  // now we need to fit stage into parent
  var containerWidth = container.offsetWidth;
  // to do this we need to scale the stage
  var scale = containerWidth / stageWidth;

  stage.width(stageWidth * scale);
  stage.height(stageHeight * scale);
  stage.scale({ x: scale, y: scale });
  stage.draw();
}
