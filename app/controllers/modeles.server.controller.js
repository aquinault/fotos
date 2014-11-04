'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Modele = mongoose.model('Modele'),
  _ = require('lodash');

/**
 * Create a modele
 */
exports.create = function(req, res) {
  var modele = new Modele(req.body);
  modele.user = req.user;

  modele.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(modele);
    }
  });
};

/**
 * Show the current modele
 */
exports.read = function(req, res) {
  res.jsonp(req.modele);
};

/**
 * Update a modele
 */
exports.update = function(req, res) {
  var modele = req.modele;

  modele = _.extend(modele, req.body);

  modele.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(modele);
    }
  });
};

/**
 * Delete an modele
 */
exports.delete = function(req, res) {
  var modele = req.modele;

  modele.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(modele);
    }
  });
};

/**
 * List of Modeles
 */
exports.list = function(req, res) {
  Modele.find().sort('-created').populate('user', 'displayName').exec(
    function(err, modeles) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(modeles);
      }
    });
};

/**
 * Modele middleware
 */
exports.modeleByID = function(req, res, next, id) {
  Modele.findById(id).populate('user', 'displayName').exec(function(err,
    modele) {
    if (err) return next(err);
    if (!modele) return next(new Error('Failed to load modele ' + id));
    req.modele = modele;
    next();
  });
};

/**
 * Modele authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.modele.user.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
