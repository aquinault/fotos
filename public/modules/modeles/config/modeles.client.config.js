'use strict';

// Configuring the Articles module
angular.module('modeles').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Modeles', 'modeles', 'dropdown',
      '/modeles(/create)?');
    Menus.addSubMenuItem('topbar', 'modeles', 'List Modeles', 'modeles');
    //Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]);
