class listaController {
	constructor($scope,$window,serviceGestionare){
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
  		$scope.viewby = 4;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
        $scope.arr=[];
  		$scope.pageChanged = function() {
  			console.log('Page changed to: ' + $scope.currentPage);
  		};
  		let val = window.localStorage.getItem('local');
  		if(!val){
  			$scope.arr = [];
  		}else{
  			$scope.arr = JSON.parse(val);
  		}
  		$scope.adaugaServicii = function($ind){
  			$scope.arrFin = [];
  			let index = $ind + $scope.viewby*($scope.currentPage-1);
  			$scope.arrFin.push($scope.info[index]);
  			$scope.arr = $scope.arr.concat($scope.arrFin);
  			console.log("adaugaServicii: ",$scope.arr);
  			window.localStorage.setItem('local',JSON.stringify($scope.arr));
  		}; 
	}
}
listaController.$inject = ['$scope','$window','serviceGestionare'];
export default listaController;
