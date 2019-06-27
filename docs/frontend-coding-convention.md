## Fronted Engine Coding Guide and Coding Conventions
___

#####Variable Names
- Use camelCase for identifier names (variables and functions).
- All names start with a letter.
- Use Short but meaning full name.


```javascript
// Example
firstName = "John";
lastName = "Doe";

price = 19.90;
tax = 0.20;

fullPrice = price + (price * tax);

```


#####Spaces Around Operators
Always put spaces around operators ( = + - * / ), and after commas:

```javascript
//Examples:
let x = y + z;
let values = ["Volvo", "Saab", "Fiat"];
```


#####Code Indentation
Always use 4 spaces for indentation of code blocks:

```javascript
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
```

#####Statement Rules

- Always end a simple statement with a semicolon.
- Put the opening bracket at the end of the first line.
- Use one space before the opening bracket.
- Put the closing bracket on a new line, without leading spaces.
- Do not end a complex statement with a semicolon.


```javascript

//Functions:
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}

//Loops:
for (i = 0; i < 5; i++) {
  x += i;
}

//Conditionals:
if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}
```


#####Switch statementsSection
Format switch statements like this:

```javascript
let expr = 'Papayas';
switch(expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    // expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log('Sorry, we are out of ' + expr + '.');
}

```


#####Defining functionsSection
Where possible, use the function declaration to define functions over function expressions:

```javascript

//Do this:

function sum(a, b) {
  return a + b;
}
//Not this:

let sum = function(a, b) {
  return a + b;
}

```

>When using anonymous functions inside a method that requires a function as a parameter, it is acceptable (although not required) to use an arrow function to make the code shorter and cleaner.

```javascript

//So instead of this:

const array1 = [1, 2, 3, 4];
let sum = array.reduce(function(a, b) {
  return a + b;  
});

//you could write this:

const array = [1, 2, 3, 4];
let sum = array.reduce((a, b) =>
  a + b
);

// Also bear in mind:
// There should be no space between a function name and its opening parenthesis.
// There should be a space between the parentheses and the opening curly brace.

```


#####Object Rules
General rules for object definitions:

- Place the opening bracket on the same line as the object name.
- Use colon plus one space between each property and its value.
- Use quotes around string values, not around numeric values.
- Do not add a comma after the last property-value pair.
- Place the closing bracket on a new line, without leading spaces.
- Always end an object definition with a semicolon.

```javascript

//Example
let person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

//Short objects can be written compressed, on one line, using spaces only between properties, like this:

let person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};

```



#####Line Length < 80
> For readability, avoid lines longer than 80 characters.
> If a JavaScript statement does not fit on one line, the best place to break it, is after an operator or a comma.

```javascript
//Example

let TheFunctionNameBecomesTooLongWhenItBecomesTooHardToReadItAndUnderstandIt = 
"Hello! World. Welcome To JavaScript";

```


#####Naming Conventions 
>Always use the same naming convention for all your code. For example:
      
- Variable and function names written as camelCase
- Constants (like PI) written in UPPERCASE


#####Hyphens in HTML and CSS:

- HTML5 attributes can start with data_ (data_quantity, data_price).
- CSS uses hyphens in property-names (font-size).


#####File Extensions
- HTML files should have a .html extension (not .htm).
- CSS files should have a .css extension.
- JavaScript files should have a .js extension.
- JSON file should .json extension.
- SCSS files should have a .scss extension
- SASS files should have a .sass extension


#####Use Lower Case File Names
>Most web servers (Apache, Unix) are case sensitive about file names:

- logo.jpg cannot be accessed as London.jpg.
- Other web servers (Microsoft, IIS) are not case sensitive:
- logo.jpg can be accessed as Logo.jpg or logo.jpg.
- If you use a mix of upper and lower case, you have to be extremely consistent.
- If you move from a case insensitive, to a case sensitive server, even small errors can break your web site.
- To avoid these problems, always use lower case file names (if possible).






##### JavaScript commentsSection
>Use JS-style comments to comment code that isn't self-documenting:


```javascript

/* Here is multiple comment
*/

// this line for single comment

function myFunc() {
  // Output the string 'Hello' to the browser's JS console
  console.log('Hello');
  // Create a new paragraph, fill it with content, and append it to the <body>
  let para = document.createElement('p');
  para.textContent = 'My new paragraph';
  document.body.appendChild(para);
}
```


#####Operators and comparisonSection
> Ternary operatorsSection and 
> Ternary operators should be put on a single line:

```javascript
let status = (age >= 18) ? 'adult' : 'minor';

//As much possible not make nested:

let status = (age >= 18)
  ? 'adult'
  : 'minor';

```


#####Use shortcuts for boolean testsSection
> Use shortcuts for boolean tests — use x and !x, not x === true and x === false.



#####Use template literalsSection
> For inserting values into strings, use string literals.

```javascript

//Do this:
let myName = 'Chris';
console.log(`Hi! I'm ${myName}!`);
```





#####Error handlingSection
> If certain states of your program throw uncaught errors, they will halt execution and potentially reduce the usefulness of the example. You should therefore catch errors using a try...catch block:
```javascript
try {
  console.log(results);
}
catch(e) {
  console.error(e);
}
```

___

####Best Practices

- Always Declare Local Variables as much possible
- Variable Declare on Top

Examples:

```javascript

// Declare at the beginning
let firstName, lastName, price, discount, fullPrice;

// Use later
firstName = "John";
lastName = "Doe";

price = 19.90;
discount = 0.10;

fullPrice = price * 100 / discount;

```

- It is a good coding practice to initialize variables when you declare them.

```javascript

// Declare and initiate at the beginning
let firstName = "",
lastName = '',
price = 0,
discount = 0,
fullPrice = 0,
myArray = [],
myObject = {};

```

- Never Declare Number, String, or Boolean Objects
Always treat numbers, strings, or booleans as primitive values. Not as objects.
Declaring these types as objects, slows down execution speed, and produces nasty side effects.

```javascript

// Example 1

let x = "John";             
let y = new String("John");
(x === y) // is false because x is a string and y is an object.


// Example 2

let x = new String("John");             
let y = new String("John");
(x == y) // is false because you cannot compare objects.
```



- Don't Use new Object()"
  1. Use {} instead of new Object()
  2. Use "" instead of new String()
  3. Use 0 instead of new Number()
  4. Use false instead of new Boolean()
  5. Use [] instead of new Array()
  6. Use /()/ instead of new RegExp()
  7. Use function (){} instead of new Function()

```javascript
Example:

let x1 = {};           // new object
let x2 = "";           // new primitive string
let x3 = 0;            // new primitive number
let x4 = false;        // new primitive boolean
let x5 = [];           // new array object
let x6 = /()/;         // new regexp object
let x7 = function(){}; // new function object

```


- Use === Comparison: 
`The == comparison operator always converts (to matching types) before comparison.
The === operator forces comparison of values and type:`


- Use Parameter Defaults: 
`If a function is called with a missing argument, the value of the missing argument is set to undefined.
Undefined values can break your code. It is a good habit to assign default values to arguments.`

```javascript
//Example
function myFunction(x, y) {
  if (y === undefined) {
    y = 0;
  }
}

```

> **ECMAScript 2015 allows:** default parameters in the function call:
function (a=1, b=1) { // function code }

___
#####Performance
- Coding conventions are not used by computers. Most rules have little impact on the execution of programs.
- Indentation and extra spaces are not significant in small scripts.
- For code in development, readability should be preferred. Larger production scripts should be minified. 
- File name base on kebab case
___

####References:
> https://www.w3schools.com/js/js_conventions.asp
> https://www.w3schools.com/js/js_best_practices.asp
> https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/JavaScript
