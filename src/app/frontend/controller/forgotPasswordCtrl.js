/**
 * Controls the Home
 */
app.controller('forgotPasswordCtrl', function ($scope, $location, $http, $rootScope, $window) {
    console.log("Forgot PasswordCtrl reporting for duty.");
    
    function getValFromHref(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return (typeof results[1] == 'undefined') ? decodeURI(results[0]) : decodeURI(results[1]);
    }
    $scope.Checkpassword = function (checkpasswordvalid) {
        $scope.PasswordTagNull = false;
        $scope.PasswordTagOk = false;
        $scope.PasswordTagNotok = false;
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$^*()_+=[\]{}|\\,.?: -]).{6,}/;
        var test = re.test(checkpasswordvalid);
        if (checkpasswordvalid == null) {
            $scope.PasswordTagNull = true;
        } else {
            if (test == true) {
                $scope.PasswordTagOk = true;
            } else {
                $scope.PasswordTagNotok = true;
            }
        }
    }
    $scope.changePwd = function () {
        $scope.UserID = getValFromHref('userId');
        $scope.code = getValFromHref('code');
        var forgotData = {
            userId: $scope.UserID,
            code: $scope.code,
            NewPassword: $scope.password
        };
        console.log('forgotData',forgotData);

        var url = $rootScope.apiCallVar + 'user/ResetPassword';
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
