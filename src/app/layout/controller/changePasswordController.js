app.controller('changePasswordCtrl', function ($scope, $rootScope, $location, $routeParams, $http) {
    $scope.master = $scope.myModel2;
    $scope.ChangePwdForm = {
        submit: function (form) {
            var firstError = null;
            if (form.$invalid) {

                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                /* SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");*/
                return;

            } else {
                /*SweetAlert.swal("Good job!", "Your form is ready to be submitted!", "success");*/
                //your code for submit
            }
        },
        reset: function (form) {

            $scope.myModel = angular.copy($scope.master);
            form.$setPristine(true);
        }
    };
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
    $scope.IncorrectPassword1 = false;
    $scope.postNewPassword = function (changePassword, oldPassword) {
        var data = {
            NewPassword: changePassword,
            CurrentPassword: oldPassword,
            UniversalID: $rootScope.userDetails.userUniversalID
        };
        var url = $rootScope.apiCallVar + 'user/ChangePassword';
        $http({
            method: 'POST',
            url: url,
            data: data,
            headers: {
                'contentType': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'

            }
        }).success(function (responseData, status, headers, config) {
            if (responseData.Errors[0] == 'Incorrect password.') {
                $scope.IncorrectPassword1 = true;
            } else {
                $scope.IncorrectPassword1 = false;
                $location.path('/myProfile/description');
            }
        });
    }

});