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
				width: 70,  
				enableFiltering: false,
				enableCellEdit: false
			},
			{
				name: 'serviciu',
				displayName: 'SERVICIU',
				enableFiltering: true,
				enableCellEdit: true,
			},
			{
				name: 'iconCode',
				displayName: 'ICON CODE',
				width: 100, 
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
		       		console.log(response.data.id);
		       	}, function () {
		       		console.log("Eroare in gestionareController - servicePutServicii");
		       	});
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
              	let params = {
              		"serviciu":row.entity.serviciu,
              		"iconCode":row.entity.iconCode,
              		"descriere":row.entity.descriere
              	};
              	params.suma=Number(row.entity.suma);
              	if(obj.verificareSuma(params.suma) && obj.verificareString(params.serviciu) && obj.verificareString(params.iconCode) && obj.verificareString(params.descriere)){
              		$scope.servPutServicii(params,row.entity.id);
              	}else{
              		sweetAlert("Atenţie!","Eroare la introducerea datelor!", "error");
              		$scope.servGetServicii();
              	}            
        };
        $scope.stergere = function(row){
         	 $scope.servDeleteServicii(row.entity.id);
        };
        $scope.servGetServicii();
	}
}
gestionareController.$inject = ['$scope','serviceGestionare'];
export default gestionareController;
