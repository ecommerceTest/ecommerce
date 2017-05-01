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
		window.onload = function() {
			if(!window.AUT){
				window.location.href = "#";
			}
		};
		window.onbeforeunload = function() {
			localStorage.removeItem('local'); 
			return '';
		};
	}
}
controllerPrincipal.$inject = ['$scope','$window','$location'];
export default controllerPrincipal;
