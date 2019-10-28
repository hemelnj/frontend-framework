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


```javascript class:"lineNo"
exportImage() {
      let classTypeName = this.get('classTypeName');

      let stateData = this.get('pdfStateData');
      let actionData = this.get('pdfActionData');

      let doc = new jsPDF('l', 'pt', 'a4');

      let width = doc.internal.pageSize.getWidth();
      let height = doc.internal.pageSize.getHeight();

      let dataURL = getRootStage().toDataURL();

      doc.addImage(dataURL, 'JPEG', 0, 0);
      doc.addPage();
      doc.text(classTypeName, width/4, 40);

      let posY;
      doc.setFontSize(12);
      doc.setFontStyle("bold");
      doc.text("State Detail",40,65);


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
        head: [['State', 'View', 'Edit']],
        body: stateData[0],
        startY: 70,
      });

      posY = doc.lastAutoTable.finalY;
      doc.setFontSize(12);
      doc.setFontStyle("bold");
      doc.text("Action Event Detail",40,posY+25);


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
        head: [['Action Event', 'Performed By']],
        body: actionData[0],
        startY: doc.autoTable.previous.finalY + 30,
      });

      doc.save(classTypeName + ' olm.pdf');

      this.set('pdfStateData',[]);
      this.set('pdfActionData',[]);

    },
```

Happy PDF :wink: 

#### References

>[jsPDF Official Documentation](https://rawgit.com/MrRio/jsPDF/master/docs/)

>[jsPDF Autotable Documentation](https://www.npmjs.com/package/jspdf-autotable/v/2.0.9)
