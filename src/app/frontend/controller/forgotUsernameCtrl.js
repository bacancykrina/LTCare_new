/**
 * Controls the Home
 */
app.controller('forgotUsernameCtrl', function ($scope, $location, $http,$rootScope,$window) {
    console.log("forgot UsernameCtrl reporting for duty.");
    
    function getValFromHref(name) {
        console.log(name);
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return (typeof results[1] == 'undefined') ? decodeURI(results[0]) : decodeURI(results[1]);
    }
    $scope.userActiveBymail = function () {
        $scope.UserID = getValFromHref('userId');
        $scope.code = getValFromHref('code');
        var data = {
            userId: $scope.UserID,
            code: $scope.code
        };

        var url = $rootScope.apiCallVar + 'user/ConfirmEmail';
        $http({
            method: 'POST',
            url: url,
            data: data,
            headers: {
                'contentType': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (responseData, status, headers, config) {
            $location.path('login/signin');
        });
    }
    $scope.sendEmail = function () {
        var forgotData = {
            Email: $scope.Email,
            EmailURl: $rootScope.currentUrl + '#/changePassword'
        };

        var url = $rootScope.apiCallVar + 'user/SendResetPasswordEmail';
        $http({
            method: 'POST',
            url: url,
            data: forgotData,
            headers: {
                'contentType': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (responseData, status, headers, config) {
            $location.path('login/signin');
        });
    }
    $scope.sendEmailForUsername = function () {
        var forgotData = {
            Email: $scope.Email,
            EmailURl: $rootScope.currentUrl + '#/login/signin'
        };

        var url = $rootScope.apiCallVar + 'User/RetrieveUserName';
        $http({
            method: 'POST',
            url: url,
            data: forgotData,
            headers: {
                'contentType': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (responseData, status, headers, config) {
            $location.path('login/signin');
        });
    }

});
