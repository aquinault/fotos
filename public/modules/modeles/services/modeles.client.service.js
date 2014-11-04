'use strict';

//Modeles service used for communicating with the modeles REST endpoints
angular.module('modeles').factory('Modeles', ['$resource',
  function($resource) {
    return $resource('modeles/:modeleId', {
      modeleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
