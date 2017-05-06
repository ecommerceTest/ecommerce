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
			let val = window.localStorage.getItem('time');
			if(val){
				console.log("Atenţie! De la ultima adăugare a serviciilor în coşul de cumpărături vor trece 10 min până la resetarea acestuia, pentru verificare încarcă din nou pagina după 10 min!");
				let dt = moment().format("DD/MM/YYYY hh:mm:ss a");
				if(moment.utc(moment(dt,"DD/MM/YYYY HH:mm:ss").diff(moment(val,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")>'00:10:00'){
					window.localStorage.removeItem('local');
				}
			}
		};
	}
}
controllerPrincipal.$inject = ['$scope','$window','$location'];
export default controllerPrincipal;
