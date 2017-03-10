app.controller('clientTimelineCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window) {

    $scope.clientTimelineDate = function (a, b) {
        $scope.data1 = [];
        $scope.data2 = [];
        var a = a.trim();
        var b = b;
        var b = b.slice(0, 10);

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetPatientActivityByDate&patientId=' + $routeParams.patientId + '&TableName=' + a + '&Fdate=' + b,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            if (responseData.APIData == "") {
                $scope.noClientTimelinePopupDataFound = true;
                $scope.clientTimelinePopupDataFound = false;
            } else {
                $scope.noClientTimelinePopupDataFound = false;
                $scope.clientTimelinePopupDataFound = true;
            }
            if (responseData.APIData != "" || responseData.APIData.length > 0) {
                $scope.data1 = [];
                $scope.data1 = responseData.APIData[0];
                $scope.data2 = responseData.APIData;
                if ($scope.data2 == null) {
                }
            } else {
            }
        }).error(function (responseData, status, headers, config) {
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
    $scope.timelinePopupTblList = 0;
    $scope.TimelinePopup = function ($event, g) {

        var currentTblName = angular.element($event.currentTarget).html();
        $scope.timelinePopupDate = g.FieldValue;
        $scope.flag2 = true;
        $rootScope.clientTimelinePopUp = true;
        $scope.timelinePopupTblList = [];
        $scope.timelinePopupTblList = g.FieldTable.split(',').map(function (string) {
            return string.split(':')[0].trim();
        });

        $scope.timelinePopupCurrentIndex = $scope.timelinePopupTblList.indexOf(currentTblName.trim());
        $scope.clientTimelineDate(currentTblName, $scope.timelinePopupDate);
        $('#timelineModal').show();
    };

    $scope.TimelinePopupNext = function () {
        $scope.timelinePopupCurrentIndex++;
        if (!angular.isUndefined($scope.timelinePopupTblList[$scope.timelinePopupCurrentIndex])) {
            $scope.clientTimelineDate($scope.timelinePopupTblList[$scope.timelinePopupCurrentIndex], $scope.timelinePopupDate);
        } else {
            $scope.timelinePopupCurrentIndex--;
        }
    };

    $scope.TimelinePopupPrevious = function () {
        $scope.timelinePopupCurrentIndex--;
        if (!angular.isUndefined($scope.timelinePopupTblList[$scope.timelinePopupCurrentIndex])) {
            $scope.clientTimelineDate($scope.timelinePopupTblList[$scope.timelinePopupCurrentIndex], $scope.timelinePopupDate);
        } else {
            $scope.timelinePopupCurrentIndex++;
        }
    };

    if ($scope.timelinePopupCurrentIndex === 0) {
        $scope.timelinePopupPreviousBtn = true;
    }

    $scope.$watch('timelinePopupCurrentIndex', function (newValue, oldValue) {
        if (newValue > 0) {
            $scope.timelinePopupPreviousBtn = false;
        } else {
            $scope.timelinePopupPreviousBtn = true;
        }
        if (newValue === $scope.timelinePopupTblList.length - 1) {
            $scope.timelinePopupNextBtn = true;
        } else {
            $scope.timelinePopupNextBtn = false;
        }
    });

    $scope.clientLoadMore = function (start, end) {
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

        $scope.isInProgress = true;

        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetPatientTimeline&patientId=' + $routeParams.patientId + '&PageNumber=' + $scope.pageNo + '&PageSize=' + $scope.itemPerPage + '&Fdate=' + start + '&Tdate=' + end,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {

            $scope.clientTimelineCount = responseData.APICount[0].ApiCount;

            if (start == '' || end == '') {
                if ($scope.clientTimelineCount == 0) {
                    $scope.noClientTimelineDataFoundRoot = false;
                    $scope.noClientTimelineDataFound = true;
                } else {
                    $scope.noClientTimelineDataFoundRoot = true;
                    $scope.noClientTimelineDataFound = false;
                }
            }

            if ((responseData.APIData != "" || responseData.APIData.length > 0)) {
                $scope.noClientTimelineDataFound = false;
                $scope.ClientTimelineDataFound = true;
            } else if (start != '' || end != '') {
                $scope.noClientTimelineDataFound = true;
                $scope.ClientTimelineDataFound = false;
            }

            if (responseData.APIData.length < $scope.itemPerPage) {
                $scope.isPatientTimelineContinue = false;
            } else {
                $scope.isPatientTimelineContinue = true;
            }
            $scope.isInProgress = false;
            $scope.loader = false;
            $scope.totalData = responseData.APICount[0].ApiCount;
            $scope.showAnchor = [];
            var data1 = "";
            var data2 = "";
            var data3 = "";
            $scope.finalObject = [];
            var colonArray = [];
            if ($scope.pageNo == 1) {
                $scope.clientdata = [];
            }

            for (var t = 0; t < responseData.APIData.length; t++) {
                $scope.clientdata.push(angular.copy(responseData.APIData[t]));
                $scope.separate = responseData.APIData[t].FieldTable.split(',');
                for (var i = 0; i < $scope.separate.length; i++) {
                    colonArray[i] = $scope.separate[i].split(':');
                }
                $scope.finalObject = [];
                data3 = "";
                for (var i = 0; i < colonArray.length; i++) {
                    $scope.finalObject[i] = [];
                    data1 = "";
                    data2 = "";
                    for (var j = 1; j < colonArray[i].length; j++) {

                        $scope.finalObject[i][j] = colonArray[i][j].split('-');

                        data1 += '<a ng-click=\"TimelinePopup($event,clientdata[$index])\"> ' + colonArray[i][0] + "</a>" + ':';
                        for (var k = 0; k < $scope.finalObject[i][j].length; k++) {
                            if ($scope.finalObject[i][j].length > 1) {
                                data2 += $scope.finalObject[i][j][k] + ((k == $scope.finalObject[i][j].length - 1) ? ', ' : ' - ');
                            } else {
                                data2 += $scope.finalObject[i][j][k] + ", ";
                            }
                        }
                    }
                    data3 += data1 + data2;
                }

                $scope.showAnchor[$scope.clientdata.length - 1] = data3;
                data3 = "";
                $scope.finalObject = [];
                colonArray = [];
            }
        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    };
    $scope.ClientTimeline = function () {
        $scope.pageNo = 1;
        $scope.itemPerPage = 20;
        $scope.clientLoadMore();
    }
    $scope.ClientTimeline();
    $scope.loadMoreData = function (start, end) {
        if ($scope.isInProgress == false && $scope.isPatientTimelineContinue == true) {
            $scope.pageNo++;
            var start = start;
            var end = end;
            $scope.clientLoadMore(start, end);
        }
    }
    $scope.closeClientTimelinePopup = function () {
        $scope.flag2 = false;
        $("#timelineModal").hide(500);
        $rootScope.clientTimelinePopUp = false;
    }
    $scope.searchByTimeline = function (start, end) {
        $scope.pageNo = 1;
        $scope.itemPerPage = 20;
        var start = start;
        var end = end;
        $scope.clientLoadMore(start, end);
    }
})