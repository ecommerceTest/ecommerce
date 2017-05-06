import verificareCampuri from '../clase/verificareCampuri.js';

class comenziController {
	constructor($scope,serviceComenzi){ 
        
        $scope.oraseLista = ['CJ','SM','BV','MS','B'];
        let obj = new verificareCampuri();

		$scope.gridComenzi = {
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
				width: 160,
				enableFiltering: true,
				enableCellEdit: false,
			},
			{
				name: 'cant',
				displayName: 'CANT',
				width: 60, 
				enableFiltering: false,
				enableCellEdit: false,
			},
			{
				name: 'suma',
				displayName: 'SUMA',
				width: 100, 
				enableFiltering: true,
				enableCellEdit: false,
			},
			{
				name: 'status',
				displayName: 'STATUS',
				rowHeight: 'auto',
				width: 120,
				enableFiltering: true,
				enableCellEdit: true,
			},
			{
				name: 'numeClient',
				displayName: 'NUME',
				width: 150,
				enableFiltering: true,
				enableCellEdit: false,
			},
			{
				name: 'prenumeClient',
				displayName: 'PRENUME',
				width: 150,
				enableFiltering: true,
				enableCellEdit: false,
			},
			{
				name: 'oras',
				displayName: 'ORAŞ',
				width: 70,
				enableFiltering: true,
				enableCellEdit: false,
			},
			{
				name: 'strada',
				displayName: 'STRADĂ',
				width: 150,
				enableFiltering: true,
				enableCellEdit: false,
			},
			{
				name: 'numar',
				displayName: 'NUMĂR',
				width: 90,
				enableFiltering: true,
				enableCellEdit: false,
			},
			{
				name:'editare',
				displayName:'',
				cellTemplate: '<div class="ui-grid-cell-contents padding text-center"><button type="button" class="btn btn-primary btn-xs" ng-click="grid.appScope.editare(row)"><i class="fa fa-pencil"></i>Salvează</button></div>',
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
       $scope.servGetComenzi = function(){
		       	serviceComenzi.getData().then(function(response) {
		       		$scope.gridComenzi.data = response.data;
		       	}, function () {
		       		console.log("Eroare in comenziController - serviceGetComenzi");
		       	});
       };
       // PUT
       $scope.servPutComenzi = function(params,id){
		       	serviceComenzi.putData(params,id).then(function(response) {
		       		console.log("");
		       	}, function () {
		       		console.log("Eroare in comenziController - servicePutComenzi");
		       	});
       };
        // DELETE
        $scope.servDeleteComenzi = function(id){
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
        			serviceComenzi.resursaDelete.id = id;
        			serviceComenzi.deleteData().then(
	       					function(data) {
	       						if(typeof data !== 'string') {
	       							console.log("Randul selectat a fost sters");
	       							$scope.servGetComenzi();
	       						}else{
	       							console.log("Randul selectat nu a fost sters");
	       						} 
	       					},function(){
	       						console.log("Eroare in comenziController - serviceDeleteComenzi");
	       					});	
        		});
        };
        $scope.editare = function(row){
        	    $scope.arata = false;
	        	let params = {
	        		"serviciu":row.entity.serviciu,
	        		"cant":row.entity.cant,
	        		"status":row.entity.status,
	        		"numeClient":row.entity.numeClient,
	        		"prenumeClient":row.entity.prenumeClient,
	        		"oras":row.entity.oras,
	        		"strada":row.entity.strada,
	        		"numar":row.entity.numar,
	        		"suma":row.entity.suma,
	        		"id":row.entity.id,
	        	};
	        	if(obj.verificareString(params.status)){
	        		if(obj.verificareLungString(12,params.status)){
	        			$scope.servPutComenzi(params,row.entity.id);
	        		}else{
	        			$scope.arata = true;
	        			$scope.servGetComenzi();
	        		}
	        	}else{
	        		sweetAlert("Atenţie!","Câmp necompletat!", "error");
	        		$scope.servGetComenzi();
	        	}
        };
        $scope.stergere = function(row){
         	 $scope.servDeleteComenzi(row.entity.id);
        };
        $scope.servGetComenzi();
  	}
}
comenziController.$inject = ['$scope','serviceComenzi'];
export default comenziController;
