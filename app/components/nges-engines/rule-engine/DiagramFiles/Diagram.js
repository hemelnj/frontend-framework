import {
  Stack
} from './Stack';
export class Diagram {
  //takes two param Konva and viewInstance
  constructor(k, view) {
    this.konva = k;
    this.btnkey = 'opt';
    this.stage = null;
    this.layer = null;
    this.viewInstace = null;
    this.ruleString = null;
    this.selectedItemForModyfication = null;
    this.operatorList = [];
    this.unitRuleList = [];
    this.finalData = [];
    this.arrowList = [];
    this.fromChild = null;
    this.toChild = null;
    this.tempArrow = null;
    this.mainView = view;
  }

  diagramInit() {
    var width = document.getElementById("container").offsetWidth;
    console.log("Width is :" + width);
    let k = this.konva;
    this.stage = new k.Stage({
      container: 'container',
      width: width,
      height: 400,
      draggable: true
    });

    this.layer = new k.Layer();
    this.stage.add(this.layer);
    let context = this;
    this.stage.on("click", function() {
      context.handleClickOnStage();
    });

    this.stage.on("mousemove", () => {
      var mousePos = this.stage.getPointerPosition();
      if (this.stage.attrs.x && this.stage.attrs.y) {
        mousePos.x = mousePos.x - this.stage.attrs.x;
        mousePos.y = mousePos.y - this.stage.attrs.y;
      }
      if (context.btnkey == "connect") {
        if (context.fromChild != null) {
          if (context.tempArrow != null) {
            context.tempArrow.destroy();
            context.layer.draw();
          }
          if (context.fromChild.getAttr("x") > mousePos.x) {
            context.tempArrow = context.drawArrow(context.fromChild.getAttr("x"),
              context.fromChild.getAttr("y"), mousePos.x + 5, mousePos.y);

          } else {
            context.tempArrow = context.drawArrow(context.fromChild.getAttr("x"),
              context.fromChild.getAttr("y"), mousePos.x - 5, mousePos.y);
          }
        }
      }
    });
  }

  handleClickOnStage() {
    var mousePos = this.stage.getPointerPosition();
    if (this.stage.attrs.x && this.stage.attrs.y) {
      mousePos.x = mousePos.x - this.stage.attrs.x;
      mousePos.y = mousePos.y - this.stage.attrs.y;
    }
    this.handleDrawingOnCanvas(mousePos);
  }

  handleDrawingOnCanvas(mousePos) {

    if (this.btnkey == "ar") {
      this.viewInstace.setShowOptFormOnModalFalse();
      this.viewInstace.setShowPopUpTrue();
    } else if (this.btnkey == "opt") {
      console.log("Here on the operator ");
      this.viewInstace.setShowOptFormOnModalTrue();
      this.viewInstace.setShowPopUpTrue();
    } else if (this.btnkey == "connect") {
      if (this.tempArrow != null) {
        this.fromChild = null;
        this.toChild = null;
        this.tempArrow.destroy();
        this.layer.draw();
        this.tempArrow = null;
      }

    } else if (this.btnkey == "save") {
      //this.generateDataToSave();
    } else if (this.btnkey == "move") {
      console.log("----moving...");
      console.log(this.arrowList[0]);
    } else if (this.btnkey == "delete") {
      console.log("Delete on action " + this.btnkey);
    } else {
      this.viewInstace.setShowPopUpTrue();
    }

    this.viewInstace.mousePos = mousePos;

  }

  isObject(A) {
    if ((typeof A === "object") && (A !== null)) {
      return true;
    }
    return false;
  }

  isUndefined(a) {
    if (typeof a === "undefined") {
      return true;
    } else {
      return false;
    }
  }

  setBtnKey(key) {
    console.log("setting button key");
    this.btnkey = key;
  }

  getBtnKey() {
    return this.btnkey;
  }

  setRuleString(s) {
    this.ruleString = s;
  }

  setViewInstance(v) {
    this.viewInstace = v;
  }
  //this method clear every item from the drawing canvas
  clearAll() {
    for (let c = 0; c < this.arrowList.length; c++) {
      this.arrowList[c].destroy();
    }
    for (let c = 0; c < this.operatorList.length; c++) {
      this.operatorList[c].destroy();
    }
    for (let c = 0; c < this.unitRuleList.length; c++) {
      this.unitRuleList[c].destroy();
    }
    this.layer.draw();
    this.arrowList = [];
    this.operatorList = [];
    this.unitRuleList = [];
    this.finalData = [];
    this.mainView.changeData("");
  }

  findIndexOfElement(item, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == item) {
        return i;
      }
    }
  }

  drawOperator(mousePos, operator) {

    if (typeof this.layer === "undefined") {
      console.log("found the bug on draw operator");
    }

    let k = this.konva;
    var group = new k.Group({
      operator: operator,
      t: "opt",
      parent: null,
      leftChild: null,
      rightChild: null
    });
    let smallRadius = 6;
    let radiusx = 25;
    let radiusy = 25;


    var circle = new k.Circle({
      x: mousePos.x,
      y: mousePos.y,
      radius: radiusx,
      fill: '#1e91b5',
      stroke: '#1e91b5',
      strokeWidth: 1
    });

    var optSign = new k.Text({
      x: mousePos.x,
      y: mousePos.y,
      text: group.getAttr("operator"),
      fontSize: 20,
      fontFamily: 'Calibri',
      fill: 'White'
    });
    optSign.setOffset({
      x: optSign.getWidth() / 2,
      y: optSign.getHeight() / 2
    });
    var rightCircle = new k.Circle({
      x: mousePos.x + radiusx,
      y: mousePos.y,
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });
    this.handleClickOnCircle(rightCircle, 'operator');
    var leftCircle = new k.Circle({
      x: mousePos.x - radiusx,
      y: mousePos.y,
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });
    this.handleClickOnCircle(leftCircle, 'operator');
    var topCircle = new k.Circle({
      x: mousePos.x,
      y: mousePos.y - radiusy,
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });

    this.handleClickOnCircle(topCircle, 'operator');

    var bottomCircle = new k.Circle({
      x: mousePos.x,
      y: mousePos.y + radiusy,
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });

    this.handleClickOnCircle(bottomCircle, 'operator');

    group.on("mouseover", () => {
      rightCircle.setAttr('fill', 'black');
      leftCircle.setAttr('fill', 'black');
      topCircle.setAttr('fill', 'black');
      bottomCircle.setAttr('fill', 'black');
      this.layer.draw();
    });

    group.on("mouseout", () => {
      rightCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      topCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      bottomCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      leftCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      this.layer.draw();
    });

    group.on('click', () => {
      if (this.btnkey == 'modify') {
        this.selectedItemForModyfication = this.findIndexOfElement(group, this.operatorList);
        this.viewInstace.setShowOptFormOnModalTrue();
      } else if (this.btnkey == 'delete') {
        for (let c = 0; c < this.arrowList.length; c++) {
          if (this.arrowList[c].getAttr('from') == group || this.arrowList[c].getAttr('to') == group) {
            this.arrowList[c].destroy();
            this.removeIndexFromArray(this.arrowList, c);
            c--;
          }
          this.mainView.changeData(this.generateDataToSave());
        }
        let romveableGroup = null;
        for (let c = 0; c < this.operatorList.length; c++) {
          if (group == this.operatorList[c]) {
            this.operatorList[c].destroy();
            this.removeIndexFromArray(this.operatorList, c);
            break;
          }
        }
        this.layer.draw();
      }
    });
    // adding all elements to the group
    group.add(circle);
    group.add(optSign);
    group.add(rightCircle);
    group.add(leftCircle);
    group.add(topCircle);
    group.add(bottomCircle);
    this.layer.add(group);
    this.stage.add(this.layer);
    this.operatorList.push(group);
    return group;
  }

  handleClickOnCircle(Object, type) {
    let context = this;
    if (type == 'operator') {

      Object.on('click', () => {

        if (this.btnkey == 'connect') {
          if (context.fromChild == null) {

            context.fromChild = Object;
          } else {

            if (context.toChild == null) {

              context.toChild = Object;
              let arrow = this.drawArrow(
                context.fromChild.getAttr("x"),
                context.fromChild.getAttr("y"),
                context.toChild.getAttr("x"),
                context.toChild.getAttr("y"));
              arrow.setAttr('from', context.fromChild.getParent());
              arrow.setAttr('to', context.toChild.getParent());
              context.arrowList.push(arrow);
              console.log(context.arrowList);
              context.fromChild = null;
              context.toChild = null;
              context.tempArrow.destroy();
              this.layer.draw();
              console.log("Triggered---");
              this.mainView.changeData(this.generateDataToSave());
              console.log("Triggered----");
            }
          }
        }
      });

    } else if (type == 'atomicrule') {
      Object.on('click', () => {

        if (this.btnkey == 'connect') {
          if (context.fromChild != null) {

            if (context.toChild == null) {

              context.toChild = Object;
              let arrow = this.drawArrow(
                context.fromChild.getAttr("x"),
                context.fromChild.getAttr("y"),
                context.toChild.getAttr("x"),
                context.toChild.getAttr("y"));
              arrow.setAttr('from', context.fromChild.getParent());
              arrow.setAttr('to', context.toChild.getParent());
              context.arrowList.push(arrow);
              console.log(context.arrowList);
              context.fromChild = null;
              context.toChild = null;
              context.tempArrow.destroy();
              this.layer.draw();
              console.log("Triggered---");
              this.mainView.changeData(this.generateDataToSave());
              console.log("Triggered----");

            }
          }
        }
      });
    }
  }

  drawAtomicRule(mousePos, rule) {
    if (typeof this.layer === "undefined") {
      console.log("found the bug on draw atomic rule");
    }
    let ruledetail = "";
    if (typeof rule.objectType !== "undefined") {
      if (rule.compObjectType == "noObject") {
        rule.compObjectType = "";
      }
      ruledetail = rule.objectType + "\n(" + rule.property + "  " + rule.operator + " " + rule.compObjectType + " " + rule.compProperty+")";

    }
    let k = this.konva;
    let smallRadius = 6;
    var group = new k.Group({
      rule: rule,
      t: "rule"
    });
    let name = rule.ruleName;
    var ruleName = new k.Text({
      x: mousePos.x,
      y: mousePos.y,
      text: ruledetail,
      fontSize: 16,
      fontFamily: 'Calibri',
      fill: 'White'
    });
    ruleName.setOffset({
      x: ruleName.getWidth() / 2,
      y: ruleName.getHeight() / 2
    });

    var ruledetailg = new k.Text({
      x: mousePos.x,
      y: mousePos.y + 30,
      text: name,
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: 'black'
    });

    ruledetailg.setOffset({
      x: ruledetailg.getWidth() / 2,
      y: ruledetailg.getHeight() / 2
    });

    var rect = new k.Rect({
      x: mousePos.x,
      y: mousePos.y,
      width: ruleName.getWidth() + 20,
      height: 40,
      fill: '#369688',
      stroke: '#369688',
      strokeWidth: 4
    });
    rect.setOffset({
      x: rect.getWidth() / 2,
      y: rect.getHeight() / 2
    });
    group.on('click', () => {
      if (this.btnkey == 'modify') {
        this.selectedItemForModyfication = this.findIndexOfElement(group, this.unitRuleList);
        this.viewInstace.setShowOptFormOnModalFalse();
      } else if (this.btnkey == 'delete') {
        for (let c = 0; c < this.arrowList.length; c++) {
          if (this.arrowList[c].getAttr('from') == group || this.arrowList[c].getAttr('to') == group) {
            this.arrowList[c].destroy();
            this.removeIndexFromArray(this.arrowList, c);
            c--;
          }
          this.mainView.changeData(this.generateDataToSave());
        }
        let romveableGroup = null;
        for (let c = 0; c < this.unitRuleList.length; c++) {
          if (group == this.unitRuleList[c]) {
            this.unitRuleList[c].destroy();
            this.removeIndexFromArray(this.unitRuleList, c);
            break;
          }
        }

        this.layer.draw();
      }
    });
    var rightCircle = new k.Circle({
      x: mousePos.x + (rect.getWidth() / 2),
      y: mousePos.y,
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });
    this.handleClickOnCircle(rightCircle, 'atomicrule');
    var leftCircle = new k.Circle({
      x: mousePos.x - (rect.getWidth() / 2),
      y: mousePos.y,
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });
    this.handleClickOnCircle(leftCircle, 'atomicrule');
    var topCircle = new k.Circle({
      x: mousePos.x,
      y: mousePos.y - (rect.getHeight() / 2),
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });
    this.handleClickOnCircle(topCircle, 'atomicrule');
    var bottomCircle = new k.Circle({
      x: mousePos.x,
      y: mousePos.y + (rect.getHeight() / 2),
      radius: smallRadius,
      fill: 'rgba(204, 153, 255,0)',
      stroke: 'rgba(204, 153, 255,0)',
      strokeWidth: 1
    });
    this.handleClickOnCircle(bottomCircle, 'atomicrule');
    group.on("mouseover", () => {
      rightCircle.setAttr('fill', 'black');
      leftCircle.setAttr('fill', 'black');
      topCircle.setAttr('fill', 'black');
      bottomCircle.setAttr('fill', 'black');
      this.layer.draw();
    });
    group.on("mouseout", () => {
      rightCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      topCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      bottomCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      leftCircle.setAttr('fill', 'rgba(204, 153, 255,0)');
      this.layer.draw();
    });
    group.add(rect); //0
    group.add(ruleName); //1
    group.add(rightCircle); //2
    group.add(leftCircle); //3
    group.add(topCircle); //4
    group.add(bottomCircle); //5
    group.add(ruledetailg); //6
    this.layer.add(group);
    this.stage.add(this.layer);
    this.unitRuleList.push(group);
    this.ruleString=name;
    return group;
  }
  //takes two cordinates using four variables , draws a line and the return a group object
  drawArrow(x1, y1, x2, y2) {
    let k = this.konva;
    let smallRadius = 6;
    var group = new k.Group({
      from: null,
      to: null,
    });
    var arrow = new k.Arrow({
      x: 0,
      y: 0,
      points: [x1, y1, x2, y2],
      pointerLength: 10,
      pointerWidth: 10,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2
    });
    group.add(arrow);
    this.layer.add(group);
    this.stage.add(this.layer);
    return group;
  }

  modifyAtomicRule(rule) {
    let name = rule.ruleName;
    this.unitRuleList[this.selectedItemForModyfication].setAttr('rule', rule);
    this.unitRuleList[this.selectedItemForModyfication].children[1].setAttr('text', name);
    this.unitRuleList[this.selectedItemForModyfication].children[1].setOffset({
      x: this.unitRuleList[this.selectedItemForModyfication].children[1].getWidth() / 2,
      y: this.unitRuleList[this.selectedItemForModyfication].children[1].getHeight() / 2
    });
    this.unitRuleList[this.selectedItemForModyfication].children[0].setAttr('width', this.unitRuleList[this.selectedItemForModyfication].children[1].getWidth() + 20);
    this.unitRuleList[this.selectedItemForModyfication].children[0].setOffset({
      x: this.unitRuleList[this.selectedItemForModyfication].children[0].getWidth() / 2,
      y: this.unitRuleList[this.selectedItemForModyfication].children[0].getHeight() / 2
    });
    let recWidth = this.unitRuleList[this.selectedItemForModyfication].children[0].getAttr("x") + this.unitRuleList[this.selectedItemForModyfication].children[0].getAttr("width") / 2
    this.unitRuleList[this.selectedItemForModyfication].children[2].setAttr("x", recWidth);

    let recHeight = this.unitRuleList[this.selectedItemForModyfication].children[0].getAttr("x") - this.unitRuleList[this.selectedItemForModyfication].children[0].getAttr("width") / 2
    this.unitRuleList[this.selectedItemForModyfication].children[3].setAttr("x", recHeight);
    let ruledetail = "";
    if (typeof rule.objectType !== "undefined") {
      if (rule.compObjectType == "noObject") {
        rule.compObjectType = "";
      }
      ruledetail = rule.objectType + " " + rule.property + "  " + rule.operator + " " + rule.compObjectType + " " + rule.compProperty;
    }
    this.unitRuleList[this.selectedItemForModyfication].children[6].setAttr("text", ruledetail);
    this.unitRuleList[this.selectedItemForModyfication].children[6].setOffset({
      x: this.unitRuleList[this.selectedItemForModyfication].children[6].getWidth() / 2,
      y: this.unitRuleList[this.selectedItemForModyfication].children[6].getHeight() / 2,
    });
    console.log(this.unitRuleList);
    this.layer.draw();
  }

  modifyOperator(operator) {
    this.operatorList[this.selectedItemForModyfication].setAttr("operator", operator);
    this.operatorList[this.selectedItemForModyfication].children[1].setAttr("text", operator);
    this.operatorList[this.selectedItemForModyfication].children[1].setOffset({
      x: this.operatorList[this.selectedItemForModyfication].children[1].getWidth() / 2,
      y: this.operatorList[this.selectedItemForModyfication].children[1].getHeight() / 2
    });
    this.layer.draw();
  }

  removeIndexFromArray(array, index) {
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  generateDataToSave() {
    console.log("Generated data");
    if (this.arrowList.length == 0) {
      return this.ruleString;
      //return "...............To debug"+ this.finalData;
    }
    for (let c = 0; c < this.arrowList.length; c++) {
      let isPresent = false;
      let index = -1;
      for (let c2 = 0; c2 < this.finalData.length; c2++) {
        if (this.finalData[c2].me == this.arrowList[c].getAttr("from")) {
          isPresent = true;
          index = c2;
          break;
        }
      }
      if (!isPresent) {
        let data = {
          parent: null,
          me: this.arrowList[c].getAttr("from"),
          left: this.arrowList[c].getAttr("to"),
          right: null
        }
        this.finalData.push(data);
      } else {
        this.finalData[index].right = this.arrowList[c].getAttr("to");
      }
    }
    let root;
    let i;
    for (let c = 0; c < this.finalData.length; c++) {
      let flag = true;
      for (let c2 = 0; c2 < this.finalData.length; c2++) {
        if ((this.finalData[c].me == this.finalData[c2].left) || (this.finalData[c].me == this.finalData[c2].right)) {
          flag = false;
          break;
        }
      }
      if (flag) {
        root = this.finalData[c];
        console.log("In root ...........................................................", root);
        break;
      }
    }

    console.log("In generate data to save....................." +this.getStringFromNode(root))
    return this.getStringFromNode(root)
  }

  getStringFromNode(group) {
    if (this.isUndefined(group)) {
      return "";
    }
    if (group.left == null || group.right == null) return "";
    console.log("-------------------------------------------------")
    console.log(group);
    console.log("--left--")
    console.log(group.left.getAttr("t"));
    console.log("--right--")
    console.log(group.right.getAttr("t"));
    if (group.left.getAttr("t") == 'opt' && group.right.getAttr("t") == 'opt') {
      return "( " + this.getStringFromNode(this.findGroupFromArr(group.left)) + " " + group.me.getAttr("operator") + " " +
        this.getStringFromNode(this.findGroupFromArr(group.right)) + " )";
    } else if (group.left.getAttr("t") == 'opt' && group.right.getAttr("t") == 'rule') {
      return "( " + this.getStringFromNode(this.findGroupFromArr(group.left)) + " " + group.me.getAttr("operator") + " " +
        group.right.getAttr("rule").ruleName + " )";
    } else if (group.left.getAttr("t") == 'rule' && group.right.getAttr("t") == 'opt') {
      return "( " + group.left.getAttr("rule").ruleName + " " + group.me.getAttr("operator") + " " +
        this.getStringFromNode(this.findGroupFromArr(group.right)) + " )";
    } else {

      return "( " + group.left.getAttr("rule").ruleName + " " + group.me.getAttr("operator") + " " + group.right.getAttr("rule").ruleName + " )";
    }

  }

  drawGroup(group, x, y) {
    let mousePos = {
      x: x,
      y: y
    };
    let g = {
      me: this.drawOperator(mousePos, group.me),
      left: null,
      right: null,
    }

    if (this.isObject(group.left)) {

      g.left = this.drawGroup(group.left, mousePos.x - 300, mousePos.y + 100);
    } else {
      let mousePos2 = {
        x: mousePos.x - 200,
        y: mousePos.y + 100
      }

      let rule = this.mainView.findRuleByName(group.left);
      if (rule == null) {
        rule = {
          ruleName: group.right
        }
      }
      g.left = this.drawAtomicRule(mousePos2, rule);
    }
    if (this.isObject(group.right)) {
      g.right = this.drawGroup(group.right, mousePos.x + 300, mousePos.y + 100);
    } else {
      let mousePos2 = {
        x: mousePos.x + 200,
        y: mousePos.y + 100
      }

      let rule = this.mainView.findRuleByName(group.right);
      if (rule == null) {
        rule = {
          ruleName: group.right
        }
      }
      g.right = this.drawAtomicRule(mousePos2, rule);
    }

    return g;

  }

  drawConnectHelperForInit(fromChild, toChild) {

    let arrow = this.drawArrow(
      fromChild.getAttr("x"),
      fromChild.getAttr("y"),
      toChild.getAttr("x"),
      toChild.getAttr("y"));
    arrow.setAttr('from', fromChild.getParent());
    arrow.setAttr('to', toChild.getParent());
    this.arrowList.push(arrow);
    return arrow;
  }

  generateDataFromString(str) {
    str = this.ruleString;
    if (str == "") {
      return;
    }
    let myDataArr = str.split(" ");
    if(myDataArr.length==1) {
      /*let mousePos = {
        x: 550,
        y: 50
      };

      this.drawAtomicRule(mousePos,myDataArr[0] );*/
      return;
    }

    var stack = new Stack();
    for (let c = 0; c < myDataArr.length; c++) {
      if (myDataArr[c] == ')') {
        //pop 4 times
        if (!stack.isEmpty()) {
          let right = stack.pop();
          let opt = stack.pop();
          let left = stack.pop();
          stack.pop();
          let obj = {
            me: opt,
            left: left,
            right: right
          }
          stack.push(obj);
        }
      } else {
        stack.push(myDataArr[c]);
      }
    }
    //console.log(stack.size());
    stack.print();
    let obj = this.drawGroup(stack.peek(), 550, 50);
    this.drawConnectOnInit(obj);
  }

  findGroupFromArr(group) {
    for (let c = 0; c < this.finalData.length; c++) {
      if (this.finalData[c].me == group) {
        return this.finalData[c];
      }
    }
  }

  drawConnectOnInit(obj) {
    let fromChild = obj.me.children[5];
    if (typeof obj.left.left != "undefined") {
      let leftToChildOpt = obj.left.me.children[4];
      this.drawConnectHelperForInit(fromChild, leftToChildOpt);
      this.drawConnectOnInit(obj.left);
    } else {
      let leftToChild = obj.left.children[4];
      this.drawConnectHelperForInit(fromChild, leftToChild);
    }
    if (typeof obj.right.right != "undefined") {
      let rightToChildOpt = obj.right.me.children[4];
      this.drawConnectHelperForInit(fromChild, rightToChildOpt);
      this.drawConnectOnInit(obj.right);
    } else {
      let rightToChild = obj.right.children[4];
      this.drawConnectHelperForInit(fromChild, rightToChild);
    }
  }
}
