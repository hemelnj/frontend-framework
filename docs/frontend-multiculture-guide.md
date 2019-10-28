## Frontend Multi-culture Guide

For multi-culture support we have used `Ember-intl` addon, which provides a helper `t` 
(translation helper) and in this helper needs to pass the string we want to translate.


For this helper we need to define translation file (bengali, english etc) in `yaml` format. 
Different translation file for different language, i.e., `bn-ln.yaml` for bengali, `en-us.yaml`
for english etc.

### Guideline For Developers
##### Step 1: Create a Translation File

- Create translation file with proper naming convention
  
  Example: For bengali translation file create file with name `bn-ln.yaml`, for chinese translation
  file create file with name `ch-ln.yaml`  
- Create translation file inside translation folder

  For creating this translation file inside translation folder run below command in your 
  development terminal -
  
  `ember g translation file-name` 
  
  Ex.: `ember g translation bn-ln`, this command will create `bn-ln.yaml` file inside
  translation folder.
  
  
  Example of a bengali translation file given below -
  
```yaml
#login-page
User: "ব্যবহারকারীর নাম"
Password: "পাসওয়ার্ড"

grettings: "এন.জি.ই.এস ৱ্যাপিড ইউ.আই ডেভেলপমেন্ট ফ্রেমওয়ার্ক"

#top-nav-menu
Admin Panel: "অ্যাডমিন প্যানেল"
Operation Panel: "অপারেশন প্যানেল"
System Settings: "সিস্টেম সেটিংস"
Sign Out: "সাইন আউট"
Change Password: "পাসওয়ার্ড পরিবর্তন"
Choose Language: "ভাষা নির্বাচন"
```

##### Step 2: Add `t` Before the Strings You Want to Translate Inside HTML Tags

Example:
```html
 <button id='save' class="nges-button nges-button-success" {{action 'validate'}}>Save</button>
```
 Above line in a html file will create a button with name "Save", but to translate this name one needs 
 to write the same line like mentioned below-

```html
 <button id='save' class="nges-button nges-button-success" {{action 'validate'}}>{{t "Save"}}</button>
```
Here, `Save` is written inside `" "` and pass this string `("Save")` to the translation helper `t`. Helper `t` will look for
corresponding translation of `"Save"` inside translation file provided in translation folder. `t`
helper will search for the translation inside currently enabled language translation file. For example, if
currently enabled system language is `Bengali` then this helper will search for corresponding translation of `"Save"` inside
`bn-ln.yaml` file. If `t` helper founds the word then it will return and show translated output to the ui otherwise
it will throw an exception.
#### References:
___
>[How to translate your Ember.js application with ember-intl](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-ember-app-with-ember-intl)

>[ember-intl](https://github.com/ember-intl/ember-intl)

>[Internationalize Ember App](https://ember-intl.github.io/ember-intl/)
