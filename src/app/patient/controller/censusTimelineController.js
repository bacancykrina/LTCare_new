app.controller('censusTimeline', function ($scope, $location, $http, $rootScope, $routeParams, $window, $resource, ngTableParams) {
    $scope.CensusTimeline = function (start, end, searchCensus) {
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientCensus?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.censusTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "Date_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'Date') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchCensus,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.censusCount = data.APICount[0].APICount;
//                        if (data.APIData == 0) {
//                            $scope.noPatientCensusDataFoundRoot = false;
//                            $scope.noPatientCensusDataFound = true;
//                            $scope.PatientCensusDataFound = false;
//                        } else {
//                            params.total(data.APICount[0].APICount); // recal. page nav controls
//                            if (data.APIData != "" || data.APIData.length > 0) {
//                                $scope.noPatientCensusDataFoundRoot = true;
//                                $scope.noPatientCensusDataFound = false;
//                                $scope.PatientCensusDataFound = true;
//                                return data.APIData;
//
//                            } else {
//                                $scope.noPatientCensusDataFoundRoot = false;
//                                $scope.noPatientCensusDataFound = true;
//                                $scope.PatientCensusDataFound = false;
//                            }
//                        }
                    if (searchCensus == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientCensusDataFoundRoot = false;
                            $scope.noPatientCensusDataFound = true;
                        } else {
                            $scope.noPatientCensusDataFoundRoot = true;
                            $scope.PatientCensusDataFound = true;
                            $scope.noPatientCensusDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientCensusDataFound = true;
                            $scope.PatientCensusDataFound = false;
                        } else {
                            $scope.noPatientCensusDataFound = false;
                            $scope.PatientCensusDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }

    $scope.shortNote = true;
    $scope.displayLongNote = function () {
        var testData = $scope.shortNote;
        if (testData == true) {
            $scope.shortNote = false;
        } else {
            $scope.shortNote = true;
        }
    };
    $scope.CensusTimeline('', '', '');
})
