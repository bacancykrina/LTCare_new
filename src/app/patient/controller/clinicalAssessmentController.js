
app.controller('clinicalAssessmentCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, ngTableParams, $resource) {

    $scope.clinicalAssessment = function (start, end, searchpatientclinicalAssessment) {
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientClinicalAssessment?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patientclinicalAssessmentDatasTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "WhenOccurred_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'WhenOccurred') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchpatientclinicalAssessment,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.assessmentCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
//                    if (data.APIData != "" || data.APIData.length > 0) {
//                        $scope.noPatientClinicalAssessmentDataFoundRoot = true;
//                        $scope.noPatientClinicalAssessmentDataFound = false;
//                        $scope.PatientClinicalAssessmentDataFound = true;
//                        return data.APIData;
//                    } else {
//                        $scope.noPatientClinicalAssessmentDataFoundRoot = false;
//                        $scope.noPatientClinicalAssessmentDataFound = true;
//                        $scope.PatientClinicalAssessmentDataFound = false;
//                    }
                    if (searchpatientclinicalAssessment == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientClinicalAssessmentDataFoundRoot = false;
                            $scope.noPatientClinicalAssessmentDataFound = true;
                        } else {
                            $scope.noPatientClinicalAssessmentDataFoundRoot = true;
                            $scope.PatientClinicalAssessmentDataFound = true;
                            $scope.noPatientClinicalAssessmentDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientClinicalAssessmentDataFound = true;
                            $scope.PatientClinicalAssessmentDataFound = false;
                        } else {
                            $scope.noPatientClinicalAssessmentDataFound = false;
                            $scope.PatientClinicalAssessmentDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.clinicalAssessment('', '', '');
})
