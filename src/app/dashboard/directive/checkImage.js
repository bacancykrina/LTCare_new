app.directive('checkImage', ['$rootScope','$q',function ($rootScope,$q) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('ngSrc', function (ngSrc) {
              var deferred = $q.defer();
              if (ngSrc !== '') {
                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                    if (element.attr('gender') == '')  {
                      var imageFile = 'User-male.png';
                    } else {
                      var imageFile = (element.attr('gender') == 'Male')?'User-male.png':'User-female.png';
                    }
                    element.attr('src',$rootScope.srcImagePath + '/assets/images/staff/' + imageFile); // set default image
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = ngSrc;
                
              } else {
                deferred.resolve(false);
                element.attr('src', $rootScope.srcImagePath + '/assets/images/staff/User-male.png'); // set default image
              }
                return deferred.promise;
            });
          }        
    };
}]);