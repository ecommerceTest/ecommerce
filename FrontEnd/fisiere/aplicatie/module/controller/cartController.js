class cartController {
	constructor($scope,$window){
        let val = window.localStorage.getItem('local');
        $scope.arrLocal = JSON.parse(val);
	}
}
cartController.$inject = ['$scope','$window'];
export default cartController;
