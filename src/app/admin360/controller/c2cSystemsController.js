app.controller('c2cCtrl',function($scope,$rootScope,$sce){
    
     $scope.c2cTab = [{
                text: "Matrix Care",
                method: "matrixCare"
            },
            {
                text: "Pace Care",
                method: "paceCare"
            },
            {
                text: "DSL",
                method: "DSL"
            },
            {
                text: "eHealthcare",
                method: "eHealthcare"
            },
            {
                text: "Practice Fusion",
                method: "practiceFusion"
            },
            {
                text: "Simple LTC",
                method: "simpleLTC"
            }];
        $scope.content = 'matrixCare';
        $scope.method = 'matrixCare';

        $scope.checkC2CTab = function (value) {
            $scope.content = value;
            if (value == 'matrixCare') {
                $scope.matrixCare();
            } else if (value == 'paceCare') {
               $scope.paceCare();
            } else if (value == 'DSL') {
               $scope.DSL();
            } else if (value == 'eHealthcare') {
               $scope.eHealthcare();
            } else if (value == 'practiceFusion') {
               $scope.practiceFusion();
            } else if (value == 'simpleLTC') {
               $scope.simpleLTC();
            } 
        };
        $scope.matrixCare = function(){
            $scope.url = $sce.trustAsResourceUrl('https://jha.achievematrix.com/');
        }
        $scope.paceCare = function(){
            $scope.url = $sce.trustAsResourceUrl('https://bcsc.pacecare.com/paceseam/login.seam;jsessionid=6127BFAB148099A7E3DC1F9F30BC3E04?cid=4865');
        }
        $scope.DSL = function(){
            $scope.url = $sce.trustAsResourceUrl('https://dslhhc.com/HHCWeb/logon.aspx');
        }
        $scope.eHealthcare = function(){
            $scope.url = $sce.trustAsResourceUrl('https://secure.ehealthcaresystems.net/LA/login.aspx');
        }
        $scope.practiceFusion = function(){
            $scope.url = $sce.trustAsResourceUrl('https://pfws.practicefusion.com/');
        }
        $scope.simpleLTC = function(){
            $scope.url = $sce.trustAsResourceUrl('http://www.simpleltc.com/');
        }
});