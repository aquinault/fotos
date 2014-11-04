'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown',
      '/articles(/create)?');
    Menus.addSubMenuItem('topbar', 'articles', 'List My Articles',
      'myarticles');
    Menus.addSubMenuItem('topbar', 'articles', 'List All Articles',
      'articles');
    Menus.addSubMenuItem('topbar', 'articles', 'New Article',
      'articles/create');
  }
]);
