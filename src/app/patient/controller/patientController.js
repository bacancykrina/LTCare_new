app.controller('patientCtrl', function ($scope, $location, $http, $rootScope, $routeParams) {
    /* Start Parent Tab*/
    $scope.selectedParentTab = $routeParams.parentTab;
    $scope.selectedChildTab = $routeParams.childTab;
    $scope.patientIdForPayer = $routeParams.patientId;

    $scope.parentTabs = [{
            text: "Client Clinical Summary Profile",
        },
        {
            text: 'Client Detail Clinical Flow',
        },
        {
            text: "Clinical Information Exchange",
        }];
    /* End Parent Tab*/
    /* Start Child Tab*/
    $scope.childTabs = [[{
                text: "Client Profile"
            },
            {
                text: 'Payers'
            },
            {
                text: "Diagnosis"
            },
            {
                text: "Orders"
            },
            {
                text: "Vitals"
            },
            {
                text: "IDT Progress Notes"
            },
            {
                text: "Lab Results"
            },
            {
                text: "Diagnostic Tests-Imaging"
            },
            {
                text: "Census Timeline"
            },
            {
                text: "Client Timeline"
            },
            {
                text: "Admit-Discharge Timeline"
            },
            {
                text: "Pharmacy Dispensed",
            }],
        [{
                text: "Plan Of Care"
            },
            {
                text: "ClinicalAssessment"
            }, {
                text: "Events"
            },
            {
                text: "MDS"
            },
            {
                text: "Oasis"
            },
            {
                text: 'HCC'
            }]];
    /* End Child Tab*/

    /* Start Check Parent Tab*/

    $scope.checkParentTab = function (tab) {
        $scope.selectedParentTab = tab;
        if (tab == 'Client Detail Clinical Flow') {
            $scope.selectedChildTab = 'Plan Of Care';
        } else if (tab == 'Client Clinical Summary Profile') {
            $scope.selectedChildTab = 'Client Profile';
        } else {
            $scope.selectedChildTab = 'information';
        }
        $location.path("/clinical/userDetail/" + $scope.selectedParentTab + "/" + $scope.selectedChildTab + "/" + $routeParams.patientId);
    }
    /* End Check Parent Tab*/
    /* Start Check Parent Tab*/
    $scope.checkChildTab = function (tab) {
        $scope.selectedChildTab = tab;
        $location.path("/clinical/userDetail/" + $scope.selectedParentTab + "/" + $scope.selectedChildTab + "/" + $routeParams.patientId);
    }
    /* End Check Parent Tab*/
    $scope.templateListForChild = {
        'Client Profile': 'app/patient/view/patientProfile.html',
        'Payers': 'app/patient/view/payer.html',
        'Diagnosis': 'app/patient/view/diagnosis.html',
        'Orders': 'app/patient/view/orders.html',
        'Vitals': 'app/patient/view/vitals.html',
        'IDT Progress Notes': 'app/patient/view/idtProgressNote.html',
        'Lab Results': 'app/patient/view/labresult.html',
        'Diagnostic Tests-Imaging': 'app/patient/view/diagnosisticTestImaging.html',
        'Census Timeline': 'app/patient/view/censusTimeline.html',
        'Client Timeline': 'app/patient/view/clientTimeline.html',
        'Admit-Discharge Timeline': 'app/patient/view/admitDischargeTimeline.html',
        'Pharmacy Dispensed': 'app/patient/view/pharmacyDispenced.html',
        'Plan Of Care': 'app/patient/view/planOfCare.html',
        'ClinicalAssessment': 'app/patient/view/clinicalAssessment.html',
        'Events': 'app/patient/view/events.html',
        'MDS': 'app/patient/view/mds.html',
        'Oasis': 'app/patient/view/oasis.html',
        'HCC': 'app/patient/view/hcc.html',
        'information': 'app/patient/view/information.html'
    };
    /* Give selected View*/
    $scope.selectedTemplateForChildTab = $scope.templateListForChild[$scope.selectedChildTab];
});