import verificareCampuri from '../clase/verificareCampuri.js';

class gestionareController {
	constructor($scope,serviceGestionare){

        let obj = new verificareCampuri();

		$scope.gridServicii = {
			enableColumnMenus: false,
			enableSorting: true,
			enableCellEditOnFocus: true,
			enableFiltering: true,
			onRegisterApi: function(gridApi){
				$scope.gridApi = gridApi;
			},
			columnDefs: [
			{
				name: 'id',
				displayName: 'ID', 
				width: 50,  
				enableFiltering: false,
				enableCellEdit: false
			},
			{
				name: 'serviciu',
				displayName: 'SERVICIU',
				rowHeight: 'auto',
				width: 300, 
				enableFiltering: true,
				enableCellEdit: true,
			},
			{
				name: 'iconCode',
				displayName: 'ICON CODE',
				width: 120, 
				enableFiltering: true,
				enableCellEdit: true,
			},
			{
				name: 'suma',
				displayName: 'SUMA',
				width: 100, 
				enableFiltering: true,
				enableCellEdit: true,
			},
			{
				name: 'descriere',
				displayName: 'DESCRIERE',
				rowHeight: 'auto',
				enableFiltering: true,
				enableCellEdit: true,
			},
			{
				name:'editare',
				displayName:'',
				cellTemplate: '<div class="ui-grid-cell-contents padding text-center"><button type="button" class="btn btn-primary btn-xs" ng-click="grid.appScope.editare(row)"><i class="fa fa-pencil"></i>Editeză</button></div>',
				width: 90,    
				enableFiltering: false,
				enableCellEdit: false,
				cellClass: 'edit-cell'
			},
			{
				name:'stergere',
				displayName: '',
				cellTemplate: '<div class="ui-grid-cell-contents padding text-center"><button type="button" class="btn btn-danger btn-xs" ng-click="grid.appScope.stergere(row)"><i class="fa fa-eraser"></i>Şterge</button></div>',
				width:90,
				enableFiltering: false,
				enableCellEdit: false,
				cellClass: 'delete-cell'
			}
			]
		};
       // GET
       $scope.servGetServicii = function(){
		       	serviceGestionare.getData().then(function(response) {
		       		$scope.gridServicii.data = response.data;
		       	}, function () {
		       		console.log("Eroare in gestionareController - serviceGetServicii");
		       	});
       };
       // PUT
       $scope.servPutServicii = function(params,id){
		       	serviceGestionare.putData(params,id).then(function(response) {
		       		console.log("");
		       		$scope.servGetServicii ();
		       	}, function () {
		       		console.log("Eroare in gestionareController - servicePutServicii");
		       	});
       };
       // POST
       $scope.servPostServicii = function(params){
		       	serviceGestionare.postData(params).then(function(response) {
		       		console.log("");
		       	}, function () {
		       		console.log("Eroare in gestionareController - servicePostServicii");
		       	});
		       	$scope.servGetServicii();
       };
       // DELETE
       $scope.servDeleteServicii = function(id){
	        	swal({
	        		title: "Eşti sigur(ă) că vrei să ştergi acest rând?",
	        		text: "",
	        		type: "warning",
	        		showCancelButton: true,
	        		confirmButtonColor: "#DD6B55",
	        		confirmButtonText: "Da, sunt sigur(ă)!",
	        		closeOnConfirm: false
	        	},
	        	function(){
	        		swal("", "Rândul selectat a fost şters!", "success");
	        		serviceGestionare.resursaDelete.id = id;
	        		serviceGestionare.deleteData().then(
	        			function(data) {
	        				if(typeof data !== 'string') {
	        					console.log("Randul selectat a fost sters");
	        					$scope.servGetServicii();
	        				}else{
	        					console.log("Randul selectat nu a fost sters");
	        				} 
	        			},function(){
	        				console.log("Eroare in gestionareController - serviceDeleteServicii");
	        			});
	        	});	
        };
        $scope.editare = function(row){
        	    $scope.arata = false;
              	let params = {
              		"serviciu":row.entity.serviciu,
              		"iconCode":row.entity.iconCode,
              		"descriere":row.entity.descriere
              	};
              	params.suma=Number(row.entity.suma);
              	if(obj.verificareSuma(params.suma) && obj.verificareString(params.serviciu) && obj.verificareString(params.iconCode) && obj.verificareString(params.descriere)){
              		if(obj.verificareLungString(25,params.serviciu) && obj.verificareLungString(200,params.descriere)){
              			$scope.servPutServicii(params,row.entity.id);
	        		}else{
	        			$scope.arata = true;
	        			$scope.servGetServicii();
	        		}
              	}else{
              		sweetAlert("Atenţie!","Eroare la introducerea datelor!", "error");
              		$scope.servGetServicii();
              	}            
        };
        $scope.stergere = function(row){
         	 $scope.servDeleteServicii(row.entity.id);
        };
        $scope.servGetServicii();
        // Adauga serviciu nou
        $scope.options = [{"iconCode":"1"},{"iconCode":"2"},{"iconCode":"3"},{"iconCode":"4"},{"iconCode":"1x2"},{"iconCode":"1x3"},{"iconCode":"2x3"}];
        $scope.selectedOption = $scope.options[0];
        // Btn Anulează
		$scope.cancel = function(){
			$scope.serviciu = '';
			$scope.suma = '';
			$scope.selectedOption = $scope.options[0];
			$scope.descriere = '';
		};
		// Btn Adaugă serviciu
		$scope.creareServNou = function(){
			let totalElem = $scope.gridServicii.data.length;
			let count = 0;
			for(let i=0;i<totalElem;i++){
				if($scope.gridServicii.data[i].serviciu === $scope.serviciu){
					count++;
				}
			}
			if(count === 0){
				let params = {
              		"serviciu":$scope.serviciu,
              		"iconCode":$scope.selectedOption.iconCode,
              		"descriere":$scope.descriere,
              		"suma":Number($scope.suma),
              		"id": totalElem+1
              	};
              	if(obj.verificareSuma(params.suma)){
              		$scope.servPostServicii(params);
              		location.reload();
              	}else{
              		sweetAlert("Atenţie!","Aţi introdus o valoare incorectă pentru câmpul sumă!", "error");
              		$scope.cancel();
              	} 
			}else{
				sweetAlert("Atenţie!","Aţi introdus o dublură a serviciului:" + " " + $scope.serviciu, "error");
				$scope.cancel();
			}
		};
	}
}
gestionareController.$inject = ['$scope','serviceGestionare'];
export default gestionareController;
