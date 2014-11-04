'use strict';

// Setting up route
angular.module('modeles').config(['$stateProvider',
  function($stateProvider) {
    // Modeles state routing
    $stateProvider.
    state('listModeles', {
      url: '/modeles',
      templateUrl: 'modules/modeles/views/list-modeles.client.view.html'
    }).
    state('createModele', {
      url: '/modeles/create',
      templateUrl: 'modules/modeles/views/create-modele.client.view.html'
    }).
    state('viewModele', {
      url: '/modeles/:modeleId',
      templateUrl: 'modules/modeles/views/view-modele.client.view.html'
    }).
    state('editModele', {
      url: '/modeles/:modeleId/edit',
      templateUrl: 'modules/modeles/views/edit-modele.client.view.html'
    });
  }
]);
