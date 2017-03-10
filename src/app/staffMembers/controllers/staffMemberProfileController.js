app.controller('staffMemberProfileCtrl', function ($scope, $http, $rootScope, $location, toastr, $routeParams) {
    console.log("staffMemberProfileCtrl reporting for duty.");
    console.log($rootScope.isActiveStaff);
    $scope.isEdit = false;
    $scope.staffRole = [];
    $scope.subRoleInStaff = [];

    $scope.staffTab = [{
            text: "Staff Profile",
            method: "staffTabProfile"
        },
        {
            text: "Patient List",
            method: "patientList"
        }];
    $scope.content = 'staffTabProfile';
    $scope.method = 'staffTabProfile';
    $scope.checkstaffTab = function (value) {
        $scope.content = value;
        if (value == 'staffTabProfile') {
            $scope.staffTabProfile();
        } else if (value == 'patientList') {
            $scope.isEdit = false;
            $scope.patientList();
        }
    };

    $scope.roles = function () {
        $scope.loader = true;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetRoles',
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (responseData != "" || responseData.length > 0) {
                $scope.roledata = [];
                angular.forEach(responseData, function (value, key) {
                    this.push({'id': value.Id, 'label': value.Name});
                }, $scope.roledata);
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.updateRole = function (data) {
        $scope.idSelect = [];
        angular.forEach($scope.staffRole, function (value, key) {
            this.push(value.id);
        }, $scope.idSelect);
        $rootScope.idSelect = $scope.idSelect.toString();
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetSubRoles&SearchKeyword=' + $rootScope.idSelect,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.dropDown = [];
            angular.forEach(responseData, function (value, key) {
                this.push({'id': value.Id, 'label': value.Name});
            }, $scope.dropDown);
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
    $scope.updateSubRole = function (data1) {
        $scope.idSelectSubrole = [];
        angular.forEach($scope.subRoleInStaff, function (value, key) {
            this.push(value.id);
        }, $scope.idSelectSubrole);
        $rootScope.idSelectSubrole = $scope.idSelectSubrole.toString();
    }

    $scope.staffTabProfile = function () {
        $scope.staffEditProfile = function () {
            $scope.isEdit = true;
            if ($scope.isEdit == true) {
                $scope.roles();
                $scope.updateRole();
                $scope.updateSubRole();
            }
            $rootScope.systemUser = $scope.imageAPIData.UserName;
            $rootScope.email = $scope.imageAPIData.Email;
            if ($rootScope.systemUser != null) {
                $scope.hidePassword = true;
            } else {
                $scope.hidePassword = false;
            }
        }
        $scope.cancel = function () {
            $scope.isEdit = false;
        }
        $scope.showProfile($routeParams.id);
    }//main tab method

    $scope.showProfile = function (staffData) {
        $scope.loader = true;
        $rootScope.staffTabID = staffData;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetStaffFullDetails&SearchKeyword=' + staffData,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (responseData.APICount[0] != null) {
                if ($rootScope.isActiveStaff == 1) {
                    if (responseData.APIData[0].ExpirationDate == null) {
                        responseData.APIData[0].ExpirationDate = 'Till now';
                    }
                    if (responseData.APICount[0].Image == null) {
                        responseData.APICount[0].Image = "/assets/images/staff/User-male.png";
                    }
                }
                $scope.staffProfileData = responseData.APIData[0];
                $scope.profileOfStaff = responseData.APIData;
                $scope.imageAPIData = responseData.APICount[0];
                $rootScope.PersonId = responseData.APICount[0].PersonId;

                $rootScope.UserID = responseData.APICount[0].UniversalID;
                $scope.getSelectedRole = responseData.Table2;
                $scope.getSelectedSubRole = responseData.Table3;

                angular.forEach($scope.getSelectedRole, function (value, key) {
                    this.push({'id': parseInt(value.RoleId), 'label': value.Name});
                }, $scope.staffRole);
                angular.forEach($scope.getSelectedSubRole, function (value, key) {
                    this.push({'id': parseInt(value.SubRoleId), 'label': value.Name});
                }, $scope.subRoleInStaff);
            } else {
                if (responseData.APIData[0].ExpirationDate == null) {
                    responseData.APIData[0].ExpirationDate = 'Till now';
                }
                $rootScope.PersonId1 = staffData;
                $scope.staffProfileData = responseData.APIData[0];
                $scope.profileOfStaff = responseData.APIData;
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }

    $scope.staffTabProfile();
    $scope.patientList = function () {
        alignFix();
        $scope.loader = true;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data/GetStaffvsPatientByID?Param1=' + $rootScope.staffTabID,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.loader = false;
            $scope.staffTabProfileArray = responseData;
            if ($scope.staffTabProfileArray.length == 0) {
                $scope.noPatientList = true;
                $scope.patientData = false;
            } else {
                $scope.noPatientList = false;
                $scope.patientData = true;
                $scope.staffTabProfileArray = responseData;
            }
        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }//patientList end
    $scope.roleofStaff = {
        scrollableHeight: '200px',
        scrollable: true,
        showUncheckAll: false,
        showCheckAll: false,
        buttonClasses: 'buttonStaff'
    }
    $scope.eventRolesInStaff = {
        onItemSelect: $scope.updateRole,
        onItemDeselect: $scope.updateRole
    };
    $scope.subRoleOfStaff = {
        scrollableHeight: '200px',
        scrollable: true,
        showUncheckAll: false,
        showCheckAll: false,
        displayProp: 'label',
        buttonClasses: 'buttonSize'
    }
    $scope.eventSubRoleInStaff = {
        onItemSelect: $scope.updateSubRole,
        onItemDeselect: $scope.updateSubRole
    };
    $scope.CheckUser = function (systemUser) {
        $scope.validationTag = false;
        $scope.UserName = systemUser;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=IsUserNameExists&SearchKeyword=' + $scope.UserName,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.UserNameData = responseData;

            if ($scope.UserNameData[0].UserNameCount == 1) {
                $scope.validationTag = true;
                $scope.validationTagOk = false;
                //Do Not remove below comment 
                //document.getElementById("userInput").disabled = true;

            } else {
                $scope.validationTag = false;
                // $scope.validationTagOk=true;
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
    $scope.CheckEmailExist = function (systemEmail) {
        $scope.validationEmailTag = false;
        $scope.Email = systemEmail;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=IsEmailExists&SearchKeyword=' + $scope.Email,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            $scope.UserEmailData = responseData;
            if ($scope.UserEmailData[0].UserNameCount > 0) {
                $scope.validationEmailTag = true;
                $scope.validationEmailTagOk = false;
                //Do Not remove below comment 
                //document.getElementById("userInput").disabled = true;

            } else {
                $scope.validationEmailTag = false;
                if (systemEmail == null) {
                    $scope.validationEmailTagOk = false;
                    $scope.validationEmailTagOk1 = true;
                } else {
                    $scope.validationEmailTagOk = true;
                    $scope.validationEmailTagOk1 = false;
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
    $scope.SendData = function (systemUser, staffPassword, email) {
        console.log('staffPassword',staffPassword);
        if ($rootScope.UserID == null) {
            var data = {
                UserName: systemUser,
                RoleIDs: $rootScope.idSelect,
                Password: staffPassword,
                SubRoleIds: $rootScope.idSelectSubrole,
                PersonID: $rootScope.PersonId,
                Email: email,
                UserID: '',
                EmailURl: $rootScope.currentUrl + '#/emailConfirm'
            };
        } else {
            var data = {
                RoleIDs: $rootScope.idSelect,
                SubRoleIds: $rootScope.idSelectSubrole,
                PersonID: $rootScope.PersonId,
                UserID: $rootScope.UserID,
                Email: email
            };
        }

        var url = $rootScope.apiCallVar + 'user/manageStaff';
        $http({
            method: 'POST',
            url: url,
            data: data,
            headers: {
                'contentType': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Authorization': $rootScope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            toastr.success('Staff Member Details Updated successfully', "Success", 3000, 'trustedHtml');
            $scope.isEdit = false;
        });
    };
});