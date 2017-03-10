'use strict';

app.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      )};
}]);

app.directive('whenScrollEnds',function () {
     return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var visibleHeight = element.height();
                /*console.log(visibleHeight);
                console.log('last');*/
                var threshold = 100;

                element.scroll(function() {
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;

                    if (hiddenContentHeight - element.scrollTop() <= threshold) {
                        // Scroll is almost at the bottom. Loading more rows
                        scope.$apply(attrs.whenScrollEnds);
                    }
                });
            }
        };
});

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