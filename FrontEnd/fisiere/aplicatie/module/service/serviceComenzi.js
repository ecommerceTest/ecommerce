export default class serviceComenzi {
    constructor(Restangular) {
        //GET
    	this.resursaGet = Restangular.withConfig(function (RestangularConfigurer) {
    		RestangularConfigurer.setFullResponse(true);
    	}).all('/comenzi');
        //PUT
        this.resursaPut = Restangular.one("/comenzi");
        // DELETE
        this.resursaDelete = Restangular.one("/comenzi");
    }
	getData () {
		return this.resursaGet.getList().then(function (response) {
             return response;
         });
	}
    putData(params,id) {
        return this.resursaPut.customPUT(params,id).then(function(data){
            return data;
        });
    }
    deleteData() {
        return this.resursaDelete.remove().then(function (data) {
           return data;
       });
    }
}

serviceComenzi.$inject = ['Restangular'];