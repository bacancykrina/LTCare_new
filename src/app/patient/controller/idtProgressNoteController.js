app.controller('idtProgressNoteCtrl', function ($scope, $location, $http, $rootScope, $routeParams,ngTableParams, $resource) {
    $scope.notes = function (start, end, searchNotes) {
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientNotes?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patientNotesTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "NoteTakenDate1_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'NoteTakenDate1') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchNotes,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.noteCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (searchNotes == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientNotesDataFoundRoot = false;
                            $scope.noPatientNotesDataFound = true;
                        } else {
                            $scope.noPatientNotesDataFoundRoot = true;
                            $scope.PatientNotesDataFound = true;
                            $scope.noPatientNotesDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientNotesDataFound = true;
                            $scope.PatientNotesDataFound = false;
                        } else {
                            $scope.noPatientNotesDataFound = false;
                            $scope.PatientNotesDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.notes('', '', '');
})