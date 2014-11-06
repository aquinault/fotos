'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
  function($resource) {
    return $resource('articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      save: {
        method: 'POST',
        headers: {
          'Content-Type': undefined
        },
        //transformRequest: angular.identity

        transformRequest: function(data) {
          var formData = new FormData();
          formData.append("content", angular.toJson(data.content));
          formData.append("title", angular.toJson(data.title));
          formData.append("image", data.image);

          //for (var i = 0; i < data.files; i++) {
          //add each file to the form data and iteratively name them
          //formData.append("file" + i, data.files[i]);
          //}

          return formData;
        }

      }

    });
  }
]);

angular.module('articles').factory('MyArticles', ['$resource',
  function($resource) {
    return $resource('myarticles/:articleId', {
      articleId: '@_id'
    });
  }
]);
