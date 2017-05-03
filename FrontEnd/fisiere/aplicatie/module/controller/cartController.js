import verificareCampuri from '../clase/verificareCampuri.js';

class cartController {
	constructor($scope,$window){
		$scope.oraseLista = ['Cj','TgM','Iasi','Tm','B'];
		$scope.selectedOption = $scope.oraseLista[0];

        let obj = new verificareCampuri();

        let val = window.localStorage.getItem('local');
        if(val){
        	let sir = JSON.parse(val);
        	$scope.arrLocal=[];
        	for(let i = 0; i<sir.length;i++){
        		let obj = {
        			"serviciu": sir[i].serviciu,
        			"iconCode": sir[i].iconCode,
        			"descriere": sir[i].descriere,
        			"suma": sir[i].suma,
        			"id": sir[i].id
        		};
        		$scope.arrLocal.push(obj);
        }
        }
        
        $scope.inc = function($index, cant){
        	$scope.arrLocal[$index].contor = cant;
        };
        $scope.dec = function($index, cant){
        	$scope.arrLocal[$index].contor = cant;
        };
        if(!$scope.arrLocal){
        	$scope.ascuns = false;
        }else{
        	$scope.ascuns = true;
        }
        $scope.trimite=function(){
        	console.log($scope.arrLocal);
        	localStorage.removeItem('local'); 
        	window.location.href = "#";
        	$scope.arrLocal=[];
        };
        $scope.stergeTot = function(){
        	$scope.arrLocal=[];
        	localStorage.removeItem('local'); 
        	window.location.href = "#";
		};

		// Btn Anulează
		$scope.cancel = function(){
			$scope.nume = '';
			$scope.prenume = '';
			$scope.oras = '';
			$scope.strada = '';
			$scope.numar = '';
		};

		
	}
}
cartController.$inject = ['$scope','$window'];
export default cartController;
