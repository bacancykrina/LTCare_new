app.controller('manageUserCtrl', function ($scope, $location, $http, $rootScope, $resource, NgTableParams, toastr) {
    $scope.mainRoles = [];
    $scope.childRoles = [];
    $scope.userDataTableConfig = [];
    $scope.userMgntTblHeaders = [{Id: 0, Name: 'User Name'}];
    $scope.userDetailsList = [];
    $scope.defaultMainRolesFlags = {};
    $scope.roleInAddStaff = [];

    $scope.isUserExist = function (systemUser) {
        $scope.validationTag = false;
        $scope.UserName = systemUser;
        $http({
            method: 'GET',
            url: 'http://69.18.221.131/api/common/data?id=IsUserNameExists&SearchKeyword=' + $scope.UserName,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'dcfd26ff-d485-4ae2-9015-5a9c29099cd3'
            }
        }).success(function (responseData, status, headers, config) {
            $scope.UserNameData = responseData;

            if ($scope.UserNameData[0].UserNameCount == 1) {
                $scope.validationTag = true;
                $scope.validationTagOk = false;
            } else {
                $scope.validationTag = false;
                if (systemUser == null) {
                    $scope.validationTagOk = false;
                    $scope.validationTagOk1 = true;
                } else {
                    $scope.validationTagOk = true;
                    $scope.validationTagOk1 = false;
                }
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.checkPassword = function (checkpasswordvalid) {
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

    $scope.roleAddSystemUser = {
        scrollableHeight: '200px',
        scrollable: true,
        showUncheckAll: false,
        showCheckAll: false,
        buttonClasses: 'buttonStaff'
    }

    $scope.externalEventsRoles = {
        onItemSelect: $scope.updateRoleAddStaff,
        onItemDeselect: $scope.updateRoleAddStaff
    };

    $scope.addSystemUser = function () {
        var systemUserData = {
            UserName: $scope.userName1,
            Prefix: $scope.prefix,
            FirstName: $scope.firstName,
            LastName: $scope.lastName,
            DOB: $scope.dob,
            Specialization: $scope.specialization,
            DepartmentId: $scope.deptId,
            Email: $scope.email,
            AlternateEmail: $scope.email1,
            Gender: $scope.gender,
            RoleIDs: $rootScope.idSelectAddstaffPost,
            Password: $scope.password,
            ConfirmPassword: $scope.password2,
            PhoneNumber: $scope.phone,
            Brief: $scope.brief,
            Biography: $scope.biography,
            Education: $scope.education,
            Experience: $scope.experience,
            Accomplishments: $scope.accomplishments,
            Membership: $scope.membership,
            Suffix: $scope.suffix,
            EmailUrl: 'http://69.18.221.129/#/emailconfirm'

        };

        var url = 'http://69.18.221.131/api/user/ManageUser';

        $http({
            method: 'POST',
            url: url,
            data: systemUserData,
            headers: {
                'contentType': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'dcfd26ff-d485-4ae2-9015-5a9c29099cd3'
            }
        }).success(function (responseData, status, headers, config) {
            toastr.success('User created successfully', "Success", 3000, 'trustedHtml');
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    };

    $scope.userRolesAndDept = function () {
        $scope.addPage = function () {
            $location.path('/administrative/manageUser/addSystemUser');
        }
        $http({
            method: 'GET',
            url: 'http://69.18.221.131/api/common/data/GetDepartments',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'dcfd26ff-d485-4ae2-9015-5a9c29099cd3'
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loaderShow = false;
            if (responseData != "" || responseData.length > 0) {
                $scope.selectedDept = "Activities";
                $scope.deptdataStaff = responseData;
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.userRolesAndDept();

    $scope.cancel = function () {
        $location.path('/administrative/manageUser');
    }

    $scope.updateMainRoles = function () {
        $http({
            method: 'GET',
            url: 'http://69.18.221.131/api/common/data/GetRoles',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'dcfd26ff-d485-4ae2-9015-5a9c29099cd3'
            }
        }).success(function (responseData, status, headers, config) {

            $scope.mainRoles = responseData;

            angular.forEach($scope.mainRoles, function (value, key) {
                $scope.userMgntTblHeaders.push(value);
                $scope.defaultMainRolesFlags[value.Id] = false;
            });

            $scope.roleStaffdata = [];
            angular.forEach($scope.mainRoles, function (value, key) {
                this.push({'id': value.Id, 'label': value.Name});
            }, $scope.roleStaffdata);

            $scope.userMgntTblHeaders.push({Id: -2, Name: 'Actions'});
        });
    };

    /*
     * Update user's child roles
     */
    $scope.updateChildRoles = function () {
        $http({
            method: 'GET',
            url: 'http://69.18.221.131/api/common/data?id=GetSubRoles&SearchKeyword=1,2,3,4,5,6',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'dcfd26ff-d485-4ae2-9015-5a9c29099cd3'
            }
        }).success(function (responseData, status, headers, config) {
            $scope.childRoles = responseData;
        });
    };

    /*
     * Get user's details with roles
     */
    $scope.getUserDetails = function () {
        $scope.loader = true;
        var Api1 = $resource('http://69.18.221.131/api/User/GetUsersManage?id', {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'dcfd26ff-d485-4ae2-9015-5a9c29099cd3'
                }
            }
        });

        $scope.userDataTableConfig = new NgTableParams(
                {
                    page: 1,
                    count: 10
                },
                {
                    getData: function (params) {
                        var orgObj1 = params.url();
                        /*var sortingVar = "AllergyName_desc"
                         if (Object.keys(orgObj1)[2] != undefined) {
                         var fieldName = String(Object.keys(orgObj1)[2]).replace('sorting[', '').replace(']', '');
                         
                         if (fieldName != 'AllergyName') {
                         sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                         } else {
                         sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                         }
                         }*/

                        var tempUrlObj1 = {
                            "Pagenumer": orgObj1.page,
                            "PageSize": orgObj1.count
                                    /*"sorting": sortingVar*/
                        };
                        return Api1.get(tempUrlObj1).$promise.then(function (data) {
                            $scope.loader = false;
                            params.total(data.APICount); // recal. page nav controls
                            if (data.APIData != "" || data.APIData.length > 0) {
                                $scope.UserDataFound = true;
                                $scope.noUserDataFound = false;
                                $scope.userDetailsList = angular.copy(data.APIData);

                                angular.forEach($scope.userDetailsList, function (user, ukey) {
                                    $scope.userDetailsList[ukey]['UserRolesFlag'] = angular.copy($scope.defaultMainRolesFlags);
                                    angular.forEach($scope.userDetailsList[ukey]['UserRolesFlag'], function (role, key) {
                                        var roleIndex = user.UserRoles.findIndex(tRole => tRole.RoleId == key);
                                        if (roleIndex > -1) {
                                            $scope.userDetailsList[ukey]['UserRolesFlag'][key] = true;
                                        }
                                    });
                                    $scope.userDetailsList[ukey]['UserRolesFlag']
                                });

                                return data.APIData;
                            } else {
                                $scope.noUserDataFound = true;
                                $scope.UserDataFound = false;
                            }
                        });
                    }
                }
        );
    };

    //Init Call
    $scope.updateMainRoles();
    $scope.updateChildRoles();
    $scope.getUserDetails();

    $scope.updateUserDetails = function (userIndex) {
        $scope.selectedRoles = [];
        angular.forEach($scope.userDetailsList[userIndex].UserRolesFlag, function (value, key) {
            if (value == true) {
                this.push(key)
            }
        }, $scope.selectedRoles);

        var updateUserData = {
            RoleIDs: $scope.selectedRoles.toString(),
            UniversalId: $scope.userDetailsList[userIndex].universalId,
            IsActive: $scope.userDetailsList[userIndex].IsActive
        };

        var url = 'http://69.18.221.131/api/user/ManageUsers';

        $http({
            method: 'POST',
            url: url,
            data: updateUserData,
            headers: {
                'contentType': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'dcfd26ff-d485-4ae2-9015-5a9c29099cd3'
            }
        }).success(function (responseData, status, headers, config) {
            toastr.success('Roles are successfully changed', "Success", 3000, 'trustedHtml');
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    };

});