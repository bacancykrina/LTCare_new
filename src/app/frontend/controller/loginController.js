/**
 * Controls the login
 */
app.controller('loginController', function ($scope, $location, $http, $rootScope, $localStorage) {
    console.log('val',$localStorage.userDetails);
    $rootScope.isLogin = false;
    $scope.status = '';
    $rootScope.apiCallVar = "http://69.18.221.131/api/";
    $scope.loginToLTcare = function (username, password) {
        $scope.loader = true;
        var postDataForLogin = {
            Username: username,
            Password: password
        };
        $http({
            method: 'POST',
            url: $rootScope.apiCallVar + 'user/login',
            contentType: 'application/x-www-form-urlencoded',
            data: JSON.stringify(postDataForLogin),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            $scope.alertBoxSuccess = true;
            $scope.alertBoxDanger = false;
            if (status == 200) {
                var userDetails = {
                    'firstName': responseData.FirstName,
                    'lastName': responseData.LastName,
                    'prefix': responseData.Prefix,
                    'suffix': responseData.Suffix,
                    'Token': responseData.Token,
                    'userRole': responseData.Roles,
                    'userName': responseData.UserName,
                    'dob': responseData.DOB,
                    'userImage': responseData.ImageUrl,
                    'userEmail': responseData.Email,
                    'userUniversalID': responseData.UniversalID,
                    'userPassword': postDataForLogin.password,
                    'Gender': postDataForLogin.Gender,
                    'PhoneNumber': responseData.PhoneNumber,
                    'Biography': responseData.Biography,
                    'Brief': responseData.Brief,
                    'Membership': responseData.Membership,
                    'Specialization': responseData.Specialization,
                    'Education': responseData.Education,
                    'Experience': responseData.Experience,
                    'Accomplishments': responseData.Accomplishments,
                    'ReferenceID': responseData.ReferenceID,
                    'DepartmentName': responseData.DepartmentName,
                    'DepartmentId': responseData.DepartmentId,
                    'IsAcceptEULA': responseData.IsAcceptEULA,
                    'selectedRoles': responseData.UserRoles

                };
                $localStorage.userDetails =  JSON.stringify(userDetails);
                $rootScope.userDetails = JSON.parse($localStorage.userDetails);
//                window.location.replace(window.location.origin + '/#/clinical/ALL/allclient/1');
                window.location.replace(window.location.origin + '/#/clinical/ALL/allclient');
            }
        }).error(function (responseData, status, headers, config) {
            $scope.alertBoxSuccess = false;
            if (status == 401) {
                $scope.status = status;
                $scope.alertBoxDanger = true;
            } else {
//                    $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
                $scope.status = status;
                $scope.alertBoxDanger = true;
            }
            $scope.loader = false;
        });
    }
});
