'use strict';

angular.module('modeles').controller('ModelesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'Modeles',
  function($scope, $stateParams, $location, Authentication, Modeles) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var modele = new Modeles({
        title: this.title,
        content: this.content
      });
      modele.$save(function(response) {
        $location.path('modeles/' + response._id);

        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function(modele) {
      if (modele) {
        modele.$remove();

        for (var i in $scope.modeles) {
          if ($scope.modeles[i] === modele) {
            $scope.modeles.splice(i, 1);
          }
        }
      } else {
        $scope.modele.$remove(function() {
          $location.path('modeles');
        });
      }
    };

    $scope.update = function() {
      var modele = $scope.modele;

      modele.$update(function() {
        $location.path('modeles/' + modele._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function() {
      $scope.modeles = Modeles.query();
    };

    $scope.findOne = function() {
      $scope.modele = Modeles.get({
        modeleId: $stateParams.modeleId
      });
    };
  }
]);
