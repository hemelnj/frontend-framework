## Frontend OLM PDF Generator Guide

For PDF, we have used `jsPdf` in our frontend framework. `jsPdf` is a library to generate PDFs in client-side JavaScript.

##### Step 1: Install jsPdf
```
npm install jspdf --save
```
##### Step 2: Import jsPdf in `ember-cli-build.js`
add this line in `ember-cli-build.js`
```
app.import('node_modules/jspdf/dist/jspdf.min.js');
```
For table in PDF, we have used `jspdf-autotable` 

##### Step 1: Install jspdf-autotable
```
npm install jspdf-autotable
```
##### Step 2: Import jsPdf in `ember-cli-build.js`
add this line in `ember-cli-build.js`
```javascript
app.import('node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js');
```

#### Some Code Snippets


##### Create a pdf
```javascript
let doc = new jsPDF('l', 'pt', 'a4');
```
this line will create a pdf in landscape and a4 size pdf

##### Get page height and width
```javascript
let width = doc.internal.pageSize.getWidth();
let height = doc.internal.pageSize.getHeight();
```

##### Get image of Diagram canvas
```javascript
let dataURL = getRootStage().toDataURL();
```

##### Add Image in PDF
```javascript
let dataURL = getRootStage().toDataURL();
doc.addImage(dataURL, 'JPEG', 0, 0);
```

##### Add Text in PDF page
```javascript
let posX = 10;
let posY = 10;
doc.text("dummy text", posX, posY);
```

##### Styling Text
```javascript
let posX = 10;
let posY = 10;
doc.setFontSize(12);
doc.setFontStyle("bold");
doc.text("dummy text", posX, posY);
```

##### Create Table in 
```javascript

let posY;
doc.setFontSize(12);
doc.setFontStyle("bold");
doc.text("Table 1 Title",40,65);


doc.autoTable({
  theme: 'plain',
  headStyles: {
  fillColor:[255,255,255],
  fontStyle: 'bold',
  textColor: [0,0,0],
  lineWidth: 0.5,
  lineColor: [0, 0, 0]
  },
  bodyStyles:{
  fillColor:[255,255,255],
  fontStyle: 'normal',
  textColor: [0,0,0],
  lineWidth: 0.5,
  lineColor: [0, 0, 0]
  },
  head: [['Column 1', 'Column 2', 'Column 3']],
  body: [
    ["data1 c1", "data1 c2", "data1 c3"],
    ["data2 c1", "data2 c2", "data2 c3"],
    ["data3 c1", "data3 c2", "data3 c3"]
  ],
  startY: 70,
});

posY = doc.lastAutoTable.finalY;
doc.setFontSize(12);
doc.setFontStyle("bold");
doc.text("Table 2 Title",40,posY+25);


doc.autoTable({
  theme: 'plain',
  headStyles: {
  fillColor:[255,255,255],
  fontStyle: 'bold',
  textColor: [0,0,0],
  lineWidth: 0.5,
  lineColor: [0, 0, 0]
  },
  bodyStyles:{
  fillColor:[255,255,255],
  fontStyle: 'normal',
  textColor: [0,0,0],
  lineWidth: 0.5,
  lineColor: [0, 0, 0]
  },
  head: [['Column 1', 'Column 2', 'Column 3']],
  body: [
    ["data1 c1", "data1 c2", "data1 c3"],
    ["data2 c1", "data2 c2", "data2 c3"],
    ["data3 c1", "data3 c2", "data3 c3"]
  ],
  startY: doc.autoTable.previous.finalY + 30,
});

doc.save('file-name.pdf');
```
Above block of code will generate tables like below - 

Table 1 Title

| Column 1 	| Column 2 	| Column 3 	|
|----------	|----------	|----------	|
| data1 c1 	| data1 c2 	| data1 c3 	|
| data2 c1 	| data2 c2 	| data2 c3 	|
| data3 c1 	| data3 c2 	| data3 c3 	|

Table 2 Title

| Column 1 	| Column 2 	| Column 3 	|
|----------	|----------	|----------	|
| data1 c1 	| data1 c2 	| data1 c3 	|
| data2 c1 	| data2 c2 	| data2 c3 	|
| data3 c1 	| data3 c2 	| data3 c3 	|
Happy PDF :wink: 

#### References

>[jsPDF Official Documentation](https://rawgit.com/MrRio/jsPDF/master/docs/)

>[jsPDF Autotable Documentation](https://www.npmjs.com/package/jspdf-autotable/v/2.0.9)
