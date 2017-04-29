class adminController {
	constructor($scope,serviceAdministrator){
		var sha256 = require('js-sha256');
		// Btn Anulează
		$scope.cancel = function(){
			$scope.utilizator = '';
			$scope.parola = '';
		};
       $scope.servVerificareUtiliz = function(ut){
		       	serviceAdministrator.getData().then(function(response) {
		       		let contor=0;
		       		for(let i=0;i<response.data.length;i++){
		       			if(response.data[i].utilizator === ut){
		       				contor++;
		       			}
		       		}
		       		if(contor === 0){
		       			let params = {
		       				"utilizator": $scope.utilizator,
		       				"parola": sha256($scope.parola+'')
		       			};
		       			$scope.servPostAdmin(params);
		       			swal("Contul a fost creat cu succes!", "", "success");
		       			$scope.cancel();
		       		}else{
		       			sweetAlert("Atenţie!","Utilizator existent!", "error");
		       			$scope.cancel();
		       		}
		       	}, function () {
		       		console.log("Eroare in adminController - servVerificareUtiliz");
		       	});
       };
		// POST
       $scope.servPostAdmin = function(params){
		       	serviceAdministrator.postData(params).then(function(response) {
		       		console.log("");
		       	}, function () {
		       		console.log("Eroare in adminController - servPostAdmin");
		       	});
       };
		// Btn Crează cont
		$scope.creareContNou = function(){                
			   $scope.servVerificareUtiliz($scope.utilizator);
		}; 
	}
}
adminController.$inject = ['$scope','serviceAdministrator'];
export default adminController;
