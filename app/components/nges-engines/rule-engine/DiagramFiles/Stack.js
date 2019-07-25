export class Stack {

  test() {
    console.log("Hello my world");
  }
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
    this.test();
  }
  pop() {
    if (this.items.length == 0) {
      return "Underflow";
    }
    return this.items.pop();
  }
  peek() {
    if (this.items.length == 0) {
      return "Underflow";
    }
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length == 0;
  }
  size() {
    return this.items.length;
  }
  print() {
    console.log("Printing stack start ");
    for (let c = 0; c < this.items.length; c++) {
      console.log(this.items[c]);
    }
    console.log("Printing stack end ");
  }
}