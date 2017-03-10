app.controller('financeProfileCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window) {
    console.log('financeProfileCtrl reporting for duty');
    $scope.selectedFinanceTab = $routeParams.fTab;
    $scope.pId = $routeParams.id;

    /* Start finance Tab*/
    $scope.financeTab = [{
            text: "Claim Details",
            method: "claimDetails"
        },
        {
            text: "Charge Details",
            method: "chargeDetails"
        },
        {
            text: "Cash Receipt Details",
            method: "cashDetails"
        },
        {
            text: "Refund",
            method: "refundDetails"
        },
        {
            text: "Write Off",
            method: "writeOff"
        },
        {
            text: "GL Account",
            method: "GLAccount"
        },
        {
            text: "PPS",
            method: "PPS"
        },
        {
            text: "AR",
            method: "AR"
        }];
    /* Start Check Parent Tab*/
    $scope.checkFinanceTab = function (tab) {
        $scope.selectedFinanceTab = tab;
        $location.path("/finance360/allClients/" + $scope.selectedFinanceTab + "/" + $routeParams.id);
    }
    /* End Check Parent Tab*/
    $scope.templateFinanceList = {
        'Claim Details': 'app/financeProfile/view/claimDetails.html',
        'Charge Details': 'app/financeProfile/view/chargeDetails.html',
        'Cash Receipt Details': 'app/financeProfile/view/receipts.html',
        'Refund': 'app/financeProfile/view/refund.html',
        'Write Off': 'app/financeProfile/view/writeOff.html',
        'GL Account': 'app/financeProfile/view/glAccount.html',
        'PPS': 'app/financeProfile/view/pps.html',
        'AR': 'app/financeProfile/view/ar.html'
    };
    /* Give selected View*/
    $scope.selectedTemplateForFinanceTab = $scope.templateFinanceList[$scope.selectedFinanceTab];
});