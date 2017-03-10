
app.controller('eventsCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, ngTableParams, $resource) {
    $scope.events = function (start, end, searchpatientevents) {
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
        var Api = $resource($rootScope.apiCallVar + 'common/data/getpatientevents?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patienteventsDatasTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "WhenOccurredDate_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'WhenOccurredDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchpatientevents,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.eventCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
                    if (searchpatientevents == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientEventsDataFoundRoot = false;
                            $scope.noPatientEventsDataFound = true;
                        } else {
                            $scope.noPatientEventsDataFoundRoot = true;
                            $scope.PatientEventsDataFound = true;
                            $scope.noPatientEventsDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientEventsDataFound = true;
                            $scope.PatientEventsDataFound = false;
                        } else {
                            $scope.noPatientEventsDataFound = false;
                            $scope.PatientEventsDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.events('', '', '');
    $scope.mouseEventOverModal = function (eventDescptionModal) {
        if (!$scope.eventFlag) {
            $scope.displayEventsDetails = eventDescptionModal;
            $rootScope.eventPopUp = true;
            $('#myEventModal').show();
            localStorage.setItem('EventDetailsData', JSON.stringify(eventDescptionModal));
        } else {
            $scope.displayEventsDetails = eventDescptionModal;
            $rootScope.eventPopUp = true;
            $('#myEventModal').show();
            localStorage.setItem('EventDetailsData', JSON.stringify(eventDescptionModal));
        }
    };
    $scope.eventDescptionModal = function (eventDescptionModal) {
        $scope.eventFlag = true;
        $scope.displayEventsDetails = eventDescptionModal;
        $rootScope.eventPopUp = true;
        $('#myEventModal').show();
        localStorage.setItem('EventDetailsData', JSON.stringify(eventDescptionModal));
    };
    $scope.mouseEventClosePopup = function () {
        if (!$scope.eventFlag) {
            $("#myEventModal").hide(500);
            $rootScope.eventPopUp = false;
        }
    }
    $scope.closeEventPopup = function () {
        $scope.eventFlag = false;
        $("#myEventModal").hide(500);
        $rootScope.eventPopUp = false;
    }

})
