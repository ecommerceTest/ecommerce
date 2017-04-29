export default class serviceGestionare {
    constructor(Restangular) {
        //GET
    	this.resursaGet = Restangular.withConfig(function (RestangularConfigurer) {
    		RestangularConfigurer.setFullResponse(true);
    	}).all('/servicii');
        //PUT
        this.resursaPut = Restangular.one("/servicii");
        //POST
        this.resursaPost = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setFullResponse(true);
        }).all('/servicii');
        // DELETE
        this.resursaDelete = Restangular.one("/servicii");
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
    postData (params) {
        return this.resursaPost.post(params).then(function (response) {
             return response;
         });
    }
    deleteData() {
        return this.resursaDelete.remove().then(function (data) {
           return data;
       });
    }
}

serviceGestionare.$inject = ['Restangular'];