

#### [Ember-intl](https://github.com/jmurphyau/ember-truth-helpers)

    $ ember install ember-intl

- [ember-intl Example](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-ember-app-with-ember-intl)

Note: Translate simple to complex messages. Localized formatting for date/time, number, and relative time.

#### [Ember-notifier](https://scottwernervt.github.io/ember-notifier/)

    $ ember install ember-notifier
 Need also frontAwesome for icon

___
#### [Ember-truth-helpers](https://www.npmjs.com/package/ember-truth-helpers)

    
    $ npm i ember-truth-helpers --save


    
#### [KonvaJS](https://konvajs.org/docs/)

    
    npm i konva --save
    
For KonvaJs, you need to specify its in `ember-cli-build.js`

```javascript

module.exports = function(defaults) {
  /...

  app.import('node_modules/konva/konva.js');
  return app.toTree();
};

```    



#### [Bootstrap 4](https://www.npmjs.com/package/ember-cli-bootstrap-4)
    
    
    ember install ember-cli-bootstrap-4

Then include the following in your app.scss file:

    @import "ember-cli-bootstrap-4/bootstrap";

For import not all Bootstrap 4 js modules, you can specify its in `ember-cli-build.js`

```javascript

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-bootstrap-4': {
      js: ['util', 'alert', 'tooltip']
    }
  });
 
  //...
};

```

`Note:` Now, just rename your `css` file to `scss` and it's done.
