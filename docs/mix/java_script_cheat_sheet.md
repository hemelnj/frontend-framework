# JavaScript for Developer





# JavaScript Types

- `String`      :-
- `Number`      :- double precision 64 bit number 
- `Boolean`     :-
- `NULL`        :-
- `Undefined`   :-
- `Object`      :-


# Coercion Thing about null

```js
let a = null;
console.log('message', typeof a); // must return null but it's return object, it's bug that not fix yet now.

let studentOne = {
  name: 'Sadhan',
  address: 'Dhaka'
};

let studentTwo = studentOne;          // here, studentOne copy reference or address or point to studentTwo(No value)
console.log('message', studentTwo);

// Javascript Immediately Invoked Function Expression IIFE 

(function() {
  console.log('message', 'Immediately Invoked Function');
})();

!function() {console.log('message', 'Same as before');}();      // not return any thing (!, + ~, - symbol)



```

# Coercion Thing about Conditional Flow

```js

let a = 0;
let b = 10;
let c = -10;
let d = "";
let e = "Hello";
let f = null;
let g = undefined;
let h = {};
let i = [];

if(a) console.log('message-a',  'true');    // false
if(b) console.log('message-b',  'true');    // true
if(c) console.log('message-c',  'true');    // true
if(d) console.log('message-d',  'true');    // false
if(e) console.log('message-e',  'true');    // true
if(f) console.log('message-f',  'true');    // false
if(g) console.log('message-g',  'true');    // false

if(h) console.log('message-h',  'true');    // true
if(i) console.log('message-i',  'true');    // true

```

# JavaScript Object

```js
let a = {};
a.name = "Md. Sadhan Sarker";
a.designation = "Software Engineer";
console.log('message', a);


let b = {
  'name' : 'Md. Sadhan Sarker',
  'designation' : 'Software Engineer'
};

console.log('message', b);
console.log('message', b.name);
console.log('message', b['name']);

let key = 'designation';
console.log('message', b[key]);


let c = {
  'name': 'Md. Sadhan Sarker',
  'designation' : 'Software Engineer',
  'address': {
    'location': 'dhaka',
    'zip': '1216',
    'roadNo': '1216',
  }
};

console.log('message', c.address.zip);

delete  c.address.roadNo;

console.log('message', c.address.roadNo);
console.log('message', c.address);
```


# JavaScript Array that Secretly an Object

```js

let languages = ['HTML', 'CSS', 'JS', 'PHP', 'Java'];

languages[2] = 'JavaScript';

console.log('message', languages[0]);
console.log('message', languages);
console.log('message-object-key', languages["1"]);
console.log('message-object-key', languages["5"]);    // undefined cause that not exists as object key
console.log('message-object-key', languages[5]);      // undefined cause that not exists as object key 
console.log('message-object-key', languages[4001]);      // undefined cause that not exists as object key 
console.log('message-object-key', languages[4001]);      // undefined cause that not exists as object key 

```


## JavaScript Functions

```js

function getName(name) {
  return name;
}

console.log('message', getName('Md. Sadhan Sarker'));

function getNameAndAge(name, zip) {
  return name;
}

console.log('message', getNameAndAge('Sadhan'));
console.log('message', getNameAndAge('Sadhan', 1216, 'dhaka'));

```

> JavaScript function as an arguments

```js

let getNameFunc = function(name) {
  console.log('Name is: ', name);
};

let executorFunc = function(fnArg, name) {
  fnArg(name);
};

executorFunc(getNameFunc, name);

```

> JavaScript function on objects

```js

let myObject  = {
  name : 'Sadhan',
};

myObject.customMethod = function() {
  console.log('message', ' This is a custom method');
};

myObject.customMethod();

```

> Deep about `this` keyword

```js

// Situation 1: without this keyword

let employee = {
  "name": "Sadhan",
  "address": "Dhaka, Mirpur",
  "information": function() {
    return employee.name + ' : '+ employee.address;
  }
};

let employeeInformation =  employee.information();
console.log('message', employeeInformation);


let newEmployee = employee;
employee = {};
console.log('message', newEmployee.information());


// Situation 2: using this keyword

let employee = {
  "name": "Sadhan",
  "address": "Dhaka, Mirpur",
  "information": function() {
    return this.name + ' : '+ this.address;
  }
};

let employeeInformation =  employee.information();
console.log('message', employeeInformation);


let newEmployee = employee;
employee = {};
console.log('message', newEmployee.information());

//Note: in this situation reference is not important, cause parent scope it already exists, that purpose it's important.

```

> Exercise 1

```js

let student = {
  "name": "Sadhan",
  "address": "Dhaka, Mirpur",
  "information": function () {
    return this.name + ' : ' + this.address;
  },
  "result": {
    'bsc': '3.33',
    'hsc': '5.00',
    'ssc': '4.50'
  },
  "isEligibleForCollege": function (res) {

    console.log('isEligibleForCollege-args', this.result.ssc);
    if (this.result.ssc < res) {
      return true;
    }
    return false;
  }
};

console.log('message', student.isEligibleForCollege(3.3));

```


> Variable Arguments

```js

let getData = function(a, b) {
  let values = arguments.length;          // here, arguments are not array it's an object remind it
  console.log('message', values);
};

console.log('message', getData(1, 2, 3, 4, 5));


// ES6 variable args.

let data = function(...n) {
  
  for(let a of n){
    console.log('message', a);
  }
};

data();
```

- Fixable to in passing argument
- No function overloading.
- Default variable arguments in ES6 feature like (...n).
- Function is also an object.


# JavaScript Array


```js

let myArray = [];

myArray.push(30);
myArray.pop();
myArray.shift();        // remove item from first
myArray.unshift(33);     // add item to first
```


> JavaScript pattern called IIFE (anonymous) that leverages function scoping to prevent global 

```js

(function () {
  a = 10;
  b = 20;
  
  console.log('message', a + ' : '+ b);
})();

```


# JavaScript Closures Example

> JS Closures is function which remember its scope, lexical scope

```js

let a = 10;           // global scope

function mainFun() {
  let b = 20;         // mainFun scope
  let innerFn = function() {
    console.log('message', a);
    console.log('message', b);
  };
  return innerFn;
}

let innerFn = mainFun();
innerFn();

// Example Private Method

let Person = (function() {
  let number = 0;
  return {
    "get": function() {
      return number;
    },
    "set": function(n) {
      number = n;
    },
    "increment": function() {
      number++;
    }
  }
  
});

let person = Person();
person.set(5);
person.increment();
console.log('message', person.get());

```

# The Module Pattern in Closures

> Hiding property using scope, helps of closures  

```js
function Person() {
  let fistName = "Sadhan";
  let lastName = "Sarker";
  
  return {
    "getFirstName": function() {
      return fistName;
    },
    "getLastName": function() {
      return lastName;
    },
    "setFirstName": function(name) {
      fistName = name;
    },
   "setLastName": function(name) {
     lastName = name;
   },
  }
  
}


let  person = Person();

console.log('message', person.getFirstName());
console.log('message', person.setFirstName("Ripon"));
// console.log('message', person.fistName);      // not access able now

```
> Closures In async Callbacks Deep Drive

```js

let a = 0;
let display = function() {
  console.log('message:- ', a);
};

for(a = 0; a < 5; a++) {
  // display();        // without closure
  setTimeout(display, 1000);        // without closure
}


// How to overcome this issue

let a = 0;


for(a = 0; a < 5; a++) {
  
  (function(valueOfA){           // now a variable, In this closure scope. so it remember
    let display = function() {
      console.log('message:- ', valueOfA);
    };
    setTimeout(display, 1000)
  })(a);   // agronomy function, that immediate call

}
```
> `Notes`: Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function. let and const not support hoisting) [...more](https://www.w3schools.com/js/js_hoisting.asp)


# Create Object

```js

function Person(name, age){
  this.name = name;
  this.age = age;
};


let person = new Person("Sadhan", 23);

```


## JavaScript Promise 


```js

let cleanRoom = function(){
  return new Promise(function(resolve, reject) {
    resolve("cleaned the room")
  });
};

let removeGarbage = function(message){
  return new Promise(function(resolve, reject) {
    resolve(message + " Removed Garbage")
  })
};

let getBonus = function(message){
  return new Promise(function(resolve, reject) {
    resolve(message + " Get Bonus")
  });
};


// sequential promise call
cleanRoom().then(function(result) {
  return removeGarbage(result);
}).then(function(result) {
   return getBonus(result);
}).then(function(result) {
  console.log('message', 'finally all the task done');
});

// must need to resolve, complete all promise
Promise.all([cleanRoom(), removeGarbage(), getBonus()]).then(function(result) {
  console.log('message', 'finally all the task done');
});


// one of them are done then okay
Promise.race([cleanRoom(), removeGarbage(), getBonus()]).then(function(result) {
  console.log('message', 'one of them task done');
});

```

## JavaScript Call, Apply and Bind

```js
let obj = {zip: 1216};

function addZipCode(zipCode) {
  return this.zip += zipCode;
};

console.log('message', addZipCode.call(obj, 1217));

let array= [1,2,3,4];
console.log('message', addZipCode.apply(obj, array));


let bound = addZipCode.bind(obj);
bound(3)
```



# JavaScript Currying function

```js
let data = function(a) {
  return function(b) {
    return function(c) {
      console.log('message', 'A....' + a, ' B....'+ b, ' C....'+ c);
    }
  }
};

data('Hello')('How are you..?')('Is It Okay?')
```


# Callback Function

```js
let messsage = function() {
  console.log('message', 'Hello from callback method');
};

let parentMethod = function(callback) {
   callback();
};

parentMethod(messsage);


```

# Iterator in JavaScript
  
```js
let a = [1,2,3,4];
let iterator = a[Symbol.iterator]();
console.log('message', iterator.next());
console.log('message', iterator.next());
console.log('message', iterator.next());
console.log('message', iterator.next());

```


# Generator in JavaScript
  
```js


function *machine(){
  yield 1;
  yield 2;
  yield 3;
}

let iterator = a[Symbol.iterator]();
console.log('message', iterator.next());
console.log('message', iterator.next());
console.log('message', iterator.next());


// Example 2

let makeAJAXCall = function() {
  setTimeout(function(url) {
   console.log('message... callbackMethod', url);
  }, 3000)
};

function request(url) {
  return new Promise((resolve, reject) => {
    makeAJAXCall(url, (err, text)=>{
      if(err) reject(err);
      else resolve(text)
    })
  })
}

function *generator() {
  yield request('url1');
  yield request('url2');
}

let iterator =  generator();

console.log('message', iterator.next());


```

# Recursion Function


```js
let add = function(n) {
  if(n <= 0){
    return 0;
  }
  return n * add(n/2); 
};


add(4);


```


## Understand Async and Await concepts

```js


  console.log('person1:- shows ticket');
  console.log('person2:- shows ticket');


  const preMovie = async () => {


    const person3PromiseToShowTicketWhenWifeArrives = new Promise( (resolve, reject) => {
      setTimeout(() => resolve('ticket'), 3000);
    });

    const getPopcorn = new Promise( (resolve, reject) => {
      setTimeout(() => resolve('popcorn'), 3000);
    });

    const getCandy = new Promise( (resolve, reject) => {
      setTimeout(() => resolve('candy'), 3000);
    });

    const getCoke = new Promise( (resolve, reject) => {
      setTimeout(() => resolve('coke'), 3000);
      //setTimeout(() => reject('rejected'), 3000);

    });

    let ticket = await person3PromiseToShowTicketWhenWifeArrives;

    let [popcorn, candy, coke] = await Promise.all([getPopcorn, getCandy, getCoke]);

    console.log('message', popcorn);
    console.log('message', candy);
    console.log('message', coke);
    console.log('message', ticket);

    return ticket;

  };

  preMovie().then( (m) => {
    console.log(`person3:- shows ticket`);
  });

  console.log('message', ' it\'s done');

```


