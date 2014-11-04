'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
  modeles = require('../../app/controllers/modeles');

module.exports = function(app) {
  // Modele Routes
  app.route('/modeles')
    .get(modeles.list)
    .post(users.requiresLogin, modeles.create);

  app.route('/modeles/:modeleId')
    .get(modeles.read)
    .put(users.requiresLogin, modeles.hasAuthorization, modeles.update)
    .delete(users.requiresLogin, modeles.hasAuthorization, modeles.delete);

  // Finish by binding the modele middleware
  app.param('modeleId', modeles.modeleByID);
};
