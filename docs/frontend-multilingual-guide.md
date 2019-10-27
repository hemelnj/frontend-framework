## Frontend Multilingual Guide

For multi-culture support we have use `Ember-intl` addon, which provides a helper `t` 
(translation helper) and in this helper needs to pass the string we want to translate.


For this helper we need to define translation file (bangla, english etc) in `yaml` format. 
Different translation file for different language, i.e., `bn-ln.yaml` for bangla, `en-us.yaml`
for english etc.

### Guideline For Developers
##### Step 1: Create a Translation File

- Create translation file with proper naming convention
  
  Example: For bangla translation file create file with name `bn-ln.yaml`, for chinese translation
  file create file with name `ch-ln.yaml`  
- Create translation file inside translation folder

  For creating this translation file inside translation file run command below in terminal -
  
  `ember g translation file-name` 
  
  Ex.: `ember g translation bn-ln`, this command will create `bn-ln.yaml` file inside
  translation folder.

##### Step 2: Add `t` Before the Strings You Want to Translate Inside HTML Tags

Example:
```html
```
 

#### References:
___
>[How to translate your Ember.js application with ember-intl](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-ember-app-with-ember-intl)

>[ember-intl](https://github.com/ember-intl/ember-intl)

>[Internationalize Ember App](https://ember-intl.github.io/ember-intl/)
