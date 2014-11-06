'use strict';

angular.module('articles').controller('ArticlesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'Articles', 'MyArticles',
  function($scope, $stateParams, $location, Authentication, Articles,
    MyArticles) {
    $scope.authentication = Authentication;

    $scope.setFiles = function(element) {
      $scope.$apply(function(scope) {
        console.log('files:', element.files);
        // Turn the FileList object into an Array
        scope.files = [];
        for (var i = 0; i < element.files.length; i++) {
          scope.files.push(element.files[i]);
        }
        scope.progressVisible = false;
      });
    };

    $scope.create = function() {
      var article = new Articles({
        title: this.title,
        content: this.content,
        image: $scope.files[0]
      });
      article.$save(function(response) {
        $location.path('articles/' + response._id);

        $scope.title = '';
        $scope.content = '';
        $scope.image = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function() {
          $location.path('articles');
        });
      }
    };

    $scope.update = function() {
      var article = $scope.article;

      article.$update(function() {
        $location.path('articles/' + article._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function() {
      $scope.articles = Articles.query();
    };

    $scope.findMy = function() {
      $scope.articles = MyArticles.query();
    };

    $scope.findOne = function() {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
  }
]);
