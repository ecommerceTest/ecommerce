class adminController {
	constructor($scope,$window,serviceAdministrator){
		var sha256 = require('js-sha256');
		// Btn Anulează
		$scope.cancel = function(){
			$scope.utilizator = '';
			$scope.parola = '';
			$scope.utilizatorAut = '';
			$scope.parolaAut = '';
		};
		$scope.verificareCredentialeValide = function(params){
			serviceAdministrator.getData().then(function(response) {
				let contor=0;
				for(let i=0;i<response.data.length;i++){
					if((response.data[i].utilizator.toUpperCase() === params.utilizator.toUpperCase())&&(response.data[i].parola.toUpperCase() === params.parola.toUpperCase())){
						contor++;
					}
				}
				if(contor > 0){
					swal("Autentificare reuşită!", "", "success");
					$window.localStorage.setItem('AUT', JSON.stringify(params));
					$scope.cancel();
					setTimeout(function () {
						$window.location.reload();
					}, 1000);
				}else{
					sweetAlert("Atenţie!", "Introduceţi credenţiale valide", "error");
					$scope.cancel();
				}
			}, function () {
				console.log("Eroare in adminController - verificareCredentialeValide");
			});
		};
       $scope.verificareUtilizExistent = function(ut){
		       	serviceAdministrator.getData().then(function(response) {
		       		let contorU=0;
		       		for(let i=0;i<response.data.length;i++){
		       			if(response.data[i].utilizator.toUpperCase() === ut.toUpperCase()){
		       				contorU++;
		       			}
		       		}
		       		if(contorU === 0){
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
		       		console.log("Eroare in adminController - verificareUtilizExistent");
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
			   $scope.verificareUtilizExistent($scope.utilizator);
		}; 
		// Btn Autentificare cont
		$scope.autentificareCont = function(){         
				let params = {
					"utilizator": $scope.utilizatorAut,
					"parola": sha256($scope.parolaAut+'')
				};       
			   $scope.verificareCredentialeValide(params);
		}; 
	}
}
adminController.$inject = ['$scope','$window','serviceAdministrator'];
export default adminController;
