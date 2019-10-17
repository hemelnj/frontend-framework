import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({


  appTemplateSetup: service('app-template-setup'),
  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  appConfiguration: service('app-configuration'),
  ngesTabTableService: service('nges-elements/nges-tab-table'),
  serviceInitializer: service('nges-services/service-initializer'),
  notifier: service(),
  intl: service(),


  selectedLanguage: null,

  init() {
    this._super(...arguments);
    this.loadLanguage();
  },

  loadLanguage() {
    let data = [
      {
        id: 1,
        type: "language",
        attributes: {
          name: "Bengali",
          fileName: "bn-ln"
        }
      },
      {
        id: 2,
        type: "language",
        attributes: {
          name: "English",
          fileName: "en-us"
        }
      }
    ];

    this.set("languageList", data);
  },
  actions: {
    onSelectLanguage(value) {

      let language = value.attributes.fileName;

      this.set('selectedLanguage', value.attributes.name);

      this.appConfiguration.setAppLanguage(language);
    },

    save() {
      let language = this.get('selectedLanguage');

      if (language != null) {
        this.get('notifier').success('Language Changed Successfully');
        this.set('selectedLanguage', null);
      } else {
        this.get('notifier').danger('Failed To Change Language');
        this.set('selectedLanguage', null);
      }

    }
  }

})
