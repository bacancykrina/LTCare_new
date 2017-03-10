app.controller('admitDischargeTimelineCtrl', function ($scope, $http, $rootScope, $routeParams) {
    $scope.AdmitLoadMore = function (start, end) {
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
        $scope.isInAdmitProgress = true;
        $http({
            method: 'GET',
            url: $rootScope.apiCallVar + 'common/data?id=GetAdmissionDischargeTimelineByID&patientId=' + $routeParams.patientId + '&PageNumber=' + $scope.AdmitpageNo + '&PageSize=' + $scope.AdmititemPerPage + '&Fdate=' + start + '&Tdate=' + end,
            contentType: 'application/x-www-form-urlencoded',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': $scope.userDetails.Token
            }
        }).success(function (responseData, status, headers, config) {
            if (responseData.APIData.length < $scope.AdmititemPerPage) {
                $scope.isPatientAdmitTimelineContinue = false;
            } else {
                $scope.isPatientAdmitTimelineContinue = true;
            }
            $scope.isInAdmitProgress = false;
            $scope.loader = false;
            $scope.admitCount = responseData.APICount[0].APICount;

            if (start == '' || end == '') {
                if ($scope.admitCount == 0) {
                    $scope.noAdmitlineDataFoundRoot = false;
                    $scope.noAdmitlineDataFound = true;
                } else {
                    $scope.noAdmitlineDataFoundRoot = true;
                    $scope.noAdmitlineDataFound = false;
                }
            }
            if ((responseData.APIData != "" || responseData.APIData.length > 0)) {

                $scope.noAdmitlineDataFound = false;
                $scope.AdmitlineDataFound = true;
            } else if (start != '' || end != '') {
                $scope.noAdmitlineDataFound = true;
                $scope.AdmitlineDataFound = false;
            }

            if ($scope.AdmitpageNo == 1) {
                $scope.admitdata = [];
            }
            for (var a = 0; a < responseData.APIData.length; a++) {
                $scope.admitdata.push(angular.copy(responseData.APIData[a]));
            }
        }).error(function (responseData, status, headers, config) {
            $scope.loader = false;
            if (status == 401) {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('No data found.').show();
            } else {
                $('.message').stop().fadeIn(400).delay(3000).fadeOut(400).text('Something went wrong.').show();
            }
        });
    }
    $scope.searchByAdmitTimeline = function (start, end) {
        $scope.AdmitpageNo = 1;
        $scope.AdmititemPerPage = 20;
        var start1 = start;
        var end1 = end;
        $scope.AdmitLoadMore(start1, end1);
    }
    $scope.AdmitPopup = function (dataForAdmit) {
        $scope.datas = dataForAdmit;
        $scope.flag2 = true;
        $rootScope.admitTimelinePopup = true;
        $('#admitModal').show();
    }
    $scope.closeAdmitTimelinePopup = function () {
        $scope.flag2 = false;
        $("#admitModal").hide(500);
        $rootScope.admitTimelinePopup = false;
    }
    $scope.AdmissionTimeline = function () {
        $scope.AdmitpageNo = 1;
        $scope.AdmititemPerPage = 20;
        $scope.AdmitLoadMore();
    }
    $scope.AdmissionTimeline();
})
