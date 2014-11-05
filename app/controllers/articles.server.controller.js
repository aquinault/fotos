'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors'),
  Article = mongoose.model('Article'),
  _ = require('lodash'),
  cloudinary = require('cloudinary');


cloudinary.config({
  cloud_name: 'dtrwlfo4w',
  api_key: '449479863253595',
  api_secret: 'yRaV9X6xsd-yzPdUIICSgBPRUKw'
});

/**
 * Create a article
 */
exports.create = function(req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  console.log(req);
  console.log(req.files);

  cloudinary.uploader.upload(req.files.image.path, function(
    result) {
    console.log(result);
    article.img = result.url;

    article.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(article);
      }
    });

  });


};

/**
 * Show the current article
 */
exports.read = function(req, res) {
  res.jsonp(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
  var article = req.article;

  article = _.extend(article, req.body);

  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
  var article = req.article;

  article.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
  Article.find().sort('-created').populate('user', 'displayName').exec(
    function(err, articles) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(articles);
      }
    });
};

/**
 * List of My Articles
 */
exports.mylist = function(req, res) {
  //req.user.id
  //Article.find().where('user', new ObjectId(req.user.id)).sort('-created').populate(
  Article.find().where('user', req.user.id).sort('-created').populate(
    'user',
    'displayName').exec(
    function(err, articles) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(articles);
      }
    });
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
  Article.findById(id).populate('user', 'displayName').exec(function(err,
    article) {
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load article ' + id));
    req.article = article;
    next();
  });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.article.user.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
