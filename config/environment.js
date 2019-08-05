'use strict';

module.exports = function (environment) {


  let ENV = {

    fontawesome: {
      defaultPrefix: 'fal', // light icons
      icons: {
        'pro-light-svg-icons': 'all',
        'free-solid-svg-icons': [
          'adjust',
          'ambulance',
          'pencil-alt'
        ]
      }
    },
    emberNotifier: {
      'primaryIcon': 'fas fa-comment',
      'infoIcon': 'fas fa-info',
      'successIcon': 'fas fa-check',
      'warningIcon': 'fas fa-exclamation',
      'dangerIcon': 'fas fa-fire',
      'secondaryIcon': 'fas fa-bell',
    },

    modulePrefix: 'frontend-engine',        // application import base
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      appName: 'Remittance Management System',
      appTitle: 'Remittance Management System',
      appLogo: '/app-logo-rms.png',
    },


    'ember-d3': {
      bundle: true
    }
  };


  //let HOST_BASE_URL = 'http://localhost';
  //let HOST_BASE_URL = 'http://192.168.20.2';
  let HOST_BASE_URL = 'http://192.168.20.2';

  //-:#############################################: development environment block
  if (environment === 'development') {

    //-------------------- NGES UI HOST
    ENV.NGES_UI_HOSTS = {
      FRONTEND_ENGINE_UI_HOST: HOST_BASE_URL + ':4200',
    };

    //-------------------- NGES BACKEND  HOST
    ENV.NGES_SERVICE_HOSTS = {
      OLM_SERVICE_HOST: 'http://olm-ngfs-core-framework.apps.115.127.24.184.nip.io',
      TREE_SERVICE_HOST: 'http://treeengine-ngfs-core-framework.apps.115.127.24.184.nip.io',
      AUTH_SERVICE_HOST: 'http://auth-ngfs-core-framework.apps.115.127.24.184.nip.io',
      MOCK_SERVICE_HOST: 'http://192.168.20.2:8089',


      APP_PE_SERVICE_HOST: 'http://rms.pe-apps.115.127.24.184.nip.io',
      APP_OLM_SERVICE_HOST: 'http://rms.olm-apps.115.127.24.184.nip.io',
      APP_SERVICE_POST_HOST: '-apps.115.127.24.184.nip.io',

      RULE_ENGINE_SERVICE_HOST: 'http://droolsbackend-ngfs-core-framework.apps.115.127.24.184.nip.io',
      //RULE_ENGINE_SERVICE_HOST: 'http://192.168.20.2:8080',
    };
  }


  if (environment === 'test') {
    // Test prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }


  console.log('application-start-on:-------', environment);

  return ENV;
};
