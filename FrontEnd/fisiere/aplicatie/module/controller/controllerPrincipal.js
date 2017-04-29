class controllerPrincipal {
	constructor($scope,$window,$location){
		window.AUT = JSON.parse(window.localStorage.getItem('AUT'));
		if (window.AUT) {
			$scope.autentificareAUT = true;
		}else{
			$scope.autentificareAUT = false;			
		}
		$scope.dezautentificare=function(){
			window.localStorage.removeItem('AUT');
			$scope.autentificareAUT = false;
			window.location.href = "#";
			swal("Dezautentificare reuşită!", "", "success");
		};
	}
}
controllerPrincipal.$inject = ['$scope','$window','$location'];
export default controllerPrincipal;
