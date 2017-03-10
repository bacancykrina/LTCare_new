app.controller('editProfileCtrl', function ($scope,$rootScope,$location,$routeParams, $http ) {
      $scope.master = $scope.myModel3;
        $scope.EditProfileForm = {
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

                $scope.myModel3 = angular.copy($scope.master);
                form.$setPristine(true);
            }
        };

        $scope.example13model = [];
        $scope.example13settings = {
            scrollableHeight: '200px',
            scrollable: true,
            showUncheckAll: false,
            showCheckAll: false,
            buttonClasses: 'buttonSize'
        }

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetDepartments',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loaderShow = false;
            if (responseData != "" || responseData.length > 0) {

                $scope.deptdata = responseData;
                $scope.selectedDept = $scope.deptdata[_.findIndex($scope.deptdata, {Id: $rootScope.userDetails.DepartmentId})];

            }
        }).error(function (responseData, status, headers, config) {
            //$scope.loaderShow = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetRoles',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loaderShow = false;

            if (responseData != "" || responseData.length > 0) {
               
                $scope.roledata = [];
                angular.forEach(responseData, function (value, key) {
                    this.push({'id': value.Id, 'label': value.Name});
                }, $scope.roledata);

                angular.forEach($rootScope.userDetails.selectedRoles, function (value, key) {
                    this.push({'id': parseInt(value.RoleId), 'label': value.Name});
                }, $scope.example13model);
                $scope.showModel();
            }
        }).error(function (responseData, status, headers, config) {
            //$scope.loaderShow = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });

        $scope.showModel = function () {
            $scope.idSelected = [];
            angular.forEach($scope.example13model, function (value, key) {
                this.push(value.id);
            }, $scope.idSelected);

            $rootScope.idSelected = $scope.idSelected.toString();
        }
        $scope.externalEvents = {
            onItemSelect: $scope.showModel,
            onItemDeselect: $scope.showModel
        };
        //for date of birth formate and convert intop string
        $scope.dobFormate = function(){
            $scope.dob = new Date(String($rootScope.userDetails.dob).split('T')[0]);
            console.log("dob===  ",$scope.dob);
        }
         $scope.editUserProfile = function () 
        {
            var editUserProfileData = {
                UniversalID: $rootScope.userDeatils.userUniversalID,
                Prefix: $scope.userDetails.prefix,
                FirstName: $scope.userDetails.firstName,
                LastName: $scope.userDetails.lastName,
                DOB: $scope.dob,
                Specialization: $scope.userDetails.Specialization,
                DepartmentId: $scope.selectedDept.Id,
                Email: $scope.userDetails.userEmail,
                RoleIDs: $rootScope.idSelected,
                PhoneNumber: $scope.userDetails.PhoneNumber,
                Brief: $scope.userDetails.Brief,
                Biography: $scope.userDetails.Biography,
                Education: Education,
                Experience: $scope.userDetails.Experience,
                Accomplishments: $scope.userDetails.Accomplishments,
                Membership: $scope.userDetails.Membership,
                Suffix: $scope.userDetails.suffix,
                ImageUrl : '/Images/images/staff/'+$rootScope.userDeatils.userUniversalID+'.JPG'
            };
            
            var url = $rootScope.apiCallVar + 'user/ManageUser';

            $http({
                method: 'POST',
                url: url,
                data: editUserProfileData,
                headers: {
                    'contentType': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDeatils.token
                }
            }).success(function (responseData, status, headers, config) {
                localStorage.setItem('userDetails', JSON.stringify($scope.userProfileData));
                $scope.addStaffImage();
            });
        };
        $scope.addStaffImage = function () {
            var data = {
                image: $scope.imageData,
                universalId: $rootScope.userDeatils.userUniversalID
            };
            //var url = 'http://localhost/stratus-angular20july/php/upload.php';//LOCAL ONLY
            var url = '/php/upload.php';//LIVE SERVER ONLY
            $http({
                method: 'POST',
                url: url,
                data: data,
                headers: {
                    'contentType': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }).success(function (responseData, status, headers, config) {
                $scope.loaderShow = false;
                $scope.imageData = '';
            }).error(function (responseData, status, headers, config) {
                $scope.loaderShow = false;
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            });
        };
        
        $scope.imageUploadAddStaff = function (element) {
            $scope.$apply(function ($scope) {
                $scope.files = element.files;
            });
            var reader = new FileReader();
            reader.onload = $scope.setImage;
            reader.readAsDataURL(element.files[0]);
        }
        
        $scope.setImage = function (e) {
            $scope.imageData = e.target.result;
        }
 
    });