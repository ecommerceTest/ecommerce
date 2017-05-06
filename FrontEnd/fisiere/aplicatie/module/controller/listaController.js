class listaController {
	constructor($scope,$window,serviceGestionare){
    let sortBy = require('sort-by');
   
		$scope.info = [];
		 // GET
		 $scope.servGetServicii = function(){
		 	serviceGestionare.getData().then(function(response) {
		 		for(let i=0;i<response.data.length;i++){
		 			$scope.info.push(response.data[i]);
		 		}
		 		$scope.totalItems = $scope.info.length;
		 	}, function () {
		 		console.log("Eroare in listaController - serviceGetServicii");
		 	});
		 };
     $scope.servGetServicii();
     // Radio afisare in ordinea crescatoare/descrescatoare a preturilor serviciilor
     $scope.RadioChange = function (rdo) {
      $scope.radio1 = rdo;
      $scope.radio2 = rdo;
      if($scope.radio1 == 'CRESC'){
       $scope.info.sort(sortBy('suma'));
     }
     if($scope.radio2 == 'DESCRESC'){
       $scope.info.sort(sortBy('-suma'));
     }
    };
    // Pagination
  	$scope.viewby = 4;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
    $scope.pageChanged = function() {
        console.log('Pagina: ' + $scope.currentPage);
      };

    $scope.detaliiFunc = function($index){
      $scope.modalDetalii = $scope.info[$index+$scope.viewby*($scope.currentPage-1)].descriere;
    };

      $scope.arr=[];
  		let val = window.localStorage.getItem('local');
  		if(!val){
  			$scope.arr = [];
  		}else{
  			$scope.arr = JSON.parse(val);
  		}
      //Verificare pentru elemente unice in sirul cu elemente alese de catre utilizator
  		function unic(arr, prop) {
  			return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
  				return i === a.indexOf(e);
  			});
  		}
      //Daca este respectata unicitatea alegerii elementelor, atunci se copiaza obiectul ales
  		let f = function(sir1,sir2){
  			let arr=[];
  			for(let i=0;i<sir1.length;i++){
  				for(let j=0;j<sir2.length;j++){
  					if(sir1[i] === sir2[j].serviciu){
  						arr.push(sir2[j]);
  						break;
  					}
  				}
  			}
  			return arr;
  		};
  		$scope.adaugaServicii = function($ind){
          $scope.arrFin = [];
          let index = $ind + $scope.viewby*($scope.currentPage-1);
          $scope.arrFin.push($scope.info[index]);
          $scope.arr = $scope.arr.concat($scope.arrFin);
          let servicii = unic($scope.arr,'serviciu');
          $scope.servicii = f(servicii,$scope.arr);
          //La fiecare accesare a functiei, se seteaza o noua data, ora, min, sec
          window.localStorage.setItem('local',JSON.stringify($scope.servicii));
          let dt = moment().format("DD/MM/YYYY hh:mm:ss a");
          window.localStorage.setItem('time',dt);
  		}; 
	}
}
listaController.$inject = ['$scope','$window','serviceGestionare'];
export default listaController;
