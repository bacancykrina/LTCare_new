app.controller('appointmentCtrl', function ($scope,toastr,$aside) {
    console.log('appointmentCtrl reporting for duty');
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [
        {
            title: 'Eye Care',
            type: 'Surgery',
            startsAt: new Date(y, m, 5, 19, 0),
            endsAt: new Date(y, m, 5, 22, 30)
        },
        {
            title: 'Free Surgery',
            type: 'Generic',
            startsAt: new Date(y, m, 8, 10, 30),
            endsAt: new Date(y, m, 9, 18, 30)
        },
        {
            title: 'Free Check-up',
            type: 'Check-up',
            startsAt: new Date(y, m, d - 5),
            endsAt: new Date(y, m, d - 2)
        },
        {
            title: 'Knee Surgery',
            type: 'Visit',
            startsAt: new Date(y, m, d - 3, 16, 0),
            endsAt: new Date(y, m, d - 3, 18, 0)
        },
        {
            title: 'Child Care',
            type: 'Conference',
            startsAt: new Date(y, m, 20, 19, 0),
            endsAt: new Date(y, m, 21, 22, 30)
        },
        {
            title: 'Knee Replacement',
            type: 'Surgery',
            startsAt: new Date(y, m, 22, 19, 0),
            endsAt: new Date(y, m, 23, 22, 30)
        },
        {
            title: 'Health Tips',
            type: 'Conference',
            startsAt: new Date(y, m, 24, 19, 0),
            endsAt: new Date(y, m, 25, 22, 30)
        },
        {
            title: 'Free Surgery',
            type: 'Surgery',
            startsAt: new Date(y, m, 26, 19, 0),
            endsAt: new Date(y, m, 27, 22, 30)
        },
        {
            title: 'Eye Camp',
            type: 'Camp',
            startsAt: new Date(y, m, 28, 19, 0),
            endsAt: new Date(y, m, 29, 22, 30)
        },
    ];

    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();

    function showModal(action, event) {
        var modalInstance = $aside.open({
            templateUrl: 'calendarEvent.html',
            placement: 'right',
            size: 'sm',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                $scope.$modalInstance = $uibModalInstance;
                $scope.action = action;
                $scope.event = event;
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.deleteEvent = function () {
                    $uibModalInstance.close($scope.event, $scope.event);
                };

            }
        });
        modalInstance.result.then(function (selectedEvent, action) {
            $scope.eventDeleted(selectedEvent);
        });
    }


    $scope.eventClicked = function (event) {
        showModal('Clicked', event);
    };
    $scope.addEvent = function () {
        $scope.events.push({
            title: 'New Event',
            startsAt: new Date(y, m, d, 10, 0),
            endsAt: new Date(y, m, d, 11, 0),
            type: 'Surgery'
        });
        $scope.eventEdited($scope.events[$scope.events.length - 1]);
    };

    $scope.eventEdited = function (event) {
        showModal('Edited', event);
    };

    $scope.eventDeleted = function (event) {
        toastr.success('Are you sure?', "Warning", 3000, 'trustedHtml');
//        SweetAlert.swal({
//            title: "Are you sure?",
//            text: "Your will not be able to recover this event!",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Yes, delete it!",
//            cancelButtonText: "No, cancel plx!",
//            closeOnConfirm: false,
//            closeOnCancel: false
//        }, function (isConfirm) {
//            if (isConfirm) {
//                $scope.events.splice(event.$id, 1);
//               // SweetAlert.swal("Deleted!", "Event has been deleted.", "success");
//            } else {
//                //SweetAlert.swal("Cancelled", "Event is safe :)", "error");
//            }
//        });
    };

    $scope.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();

        event[field] = !event[field];
    };
})