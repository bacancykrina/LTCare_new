/**
 * Controls the About
 */
app.controller('AboutCtrl', function ($scope, $location, $http) {
    $scope.test = true;
    $scope.data = [];
    $scope.sortBy = '-id';
    $scope.filter = {};

    $scope.getApiData = function () {

        $http({
            method: 'GET',
            url: "https://jsonplaceholder.typicode.com/posts/1/comments"
        }).then(function successCallback(response) {
            $scope.data = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    console.log("About Controller reporting for duty.");
});
