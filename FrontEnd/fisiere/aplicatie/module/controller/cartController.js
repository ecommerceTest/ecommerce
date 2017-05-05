import verificareCampuri from '../clase/verificareCampuri.js';

class cartController {
	constructor($scope,$window,serviceTrimiteComanda){
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
        			"cant": 1,
        			"suma": sir[i].suma,
        			"id": sir[i].id
        		};
        		$scope.arrLocal.push(obj);
        		window.localStorage.setItem('local',JSON.stringify($scope.arrLocal));
        }
        }
        $scope.inc = function($index, cant){
        	let x = JSON.parse(window.localStorage.getItem('local'));
        	x[$index].cant = cant;
        	window.localStorage.setItem('local',JSON.stringify(x));
        };
        $scope.dec = function($index, cant){
        	let x = JSON.parse(window.localStorage.getItem('local'));
        	x[$index].cant = cant;
        	window.localStorage.setItem('local',JSON.stringify(x));
        };
        if(!$scope.arrLocal){
        	$scope.ascuns = false;
        }else{
        	$scope.ascuns = true;
        }
        // POST
       $scope.servPostServicii = function(params){
		       	serviceTrimiteComanda.postData(params).then(function(response) {
		       		if(response){
		       			localStorage.removeItem('local'); 
		       			window.location.href = "#";
		       		}

		       	}, function () {
		       		console.log("Eroare in cartController - servicePostServicii");
		       	});
       };
        $scope.trimite=function(){
            $scope.arrLocal = exclus(JSON.parse(window.localStorage.getItem('local')));
            if(obj.verificareCampuriComanda($scope.nume) ===''){
            	sweetAlert("Atenţie!","Câmpul nume!", "error");
            }else if(obj.verificareCampuriComanda($scope.prenume) ===''){
            	sweetAlert("Atenţie!","Câmpul prenume!", "error");
            }else if(obj.verificareCampuriComanda($scope.strada) ===''){
            	sweetAlert("Atenţie!","Câmpul strada!", "error");
            }else if(obj.verificareCampuriComanda($scope.strada) ===''){
            	sweetAlert("Atenţie!","Câmpul strada!", "error");
            }else if(obj.verificareCampNrComanda($scope.numar) ===false){
            	sweetAlert("Atenţie!","Câmpul numar!", "error");
            }else{
            for(let i=0;i<$scope.arrLocal.length;i++){
            	let params = {
            		"serviciu": $scope.arrLocal[i].serviciu,
            		"cant": $scope.arrLocal[i].cant,
            		"suma": $scope.arrLocal[i].suma,
            		"status": "asteptare",
            		"numeClient":  $scope.nume,
            		"prenumeClient": $scope.prenume,
            		"oras": $scope.selectedOption,
            		"strada": $scope.strada,
            		"numar": $scope.numar
            	};
            	$scope.servPostServicii(params);
                console.log(params);
            }
            }
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
			$scope.strada = '';
			$scope.numar = '';
			$scope.selectedOption = $scope.oraseLista[0];
		};
		let exclus = function(arr){
			let newArr=[];
			for(let i = 0; i<arr.length;i++){
				if(arr[i].cant>0){
					newArr.push(arr[i]);
				}
			}
			return newArr;
		};
	}
}
cartController.$inject = ['$scope','$window','serviceTrimiteComanda'];
export default cartController;
