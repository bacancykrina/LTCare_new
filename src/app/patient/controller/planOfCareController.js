
app.controller('planOfCareCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, ngTableParams, $resource) {

    $scope.planOfCare = function (start, end, searchPlanOfCare) {
        $scope.loader = true;
        $scope.start = start;
        $scope.end = end;
        var start = end = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            start = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }

        if ($scope.end) {
            var d = new Date($scope.end);
            end = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientPlanOfCare?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patientPlanOfCareDatasTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "ProblemCreationDate_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'ProblemCreationDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchPlanOfCare,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.planCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (searchPlanOfCare == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientPlanOfCareDataFoundRoot = false;
                            $scope.noPatientPlanOfCareDataFound = true;
                        } else {
                            $scope.noPatientPlanOfCareDataFoundRoot = true;
                            $scope.PatientPlanOfCareDataFound = true;
                            $scope.noPatientPlanOfCareDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientPlanOfCareDataFound = true;
                            $scope.PatientPlanOfCareDataFound = false;
                        } else {
                            $scope.noPatientPlanOfCareDataFound = false;
                            $scope.PatientPlanOfCareDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.planOfCare('', '', '');
})
