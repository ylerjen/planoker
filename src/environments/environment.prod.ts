const { version: appVersion } = require('../../package.json');

export const environment = {
  production: true,
  version: appVersion,
  firebase: {
    apiKey: 'AIzaSyB5nZUAzoRW5Ch-pQbDDmeTL0CDL9GjUYs',
    authDomain: 'planoker-5199b.firebaseapp.com',
    databaseURL: 'https://planoker-5199b.firebaseio.com',
    projectId: 'planoker-5199b',
    storageBucket: '',
    messagingSenderId: '244806065981'
  }
};
