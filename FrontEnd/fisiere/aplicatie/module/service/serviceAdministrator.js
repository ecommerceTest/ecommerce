export default class serviceAdministrator {
    constructor(Restangular) {
        //GET
    	this.resursaGet = Restangular.withConfig(function (RestangularConfigurer) {
    		RestangularConfigurer.setFullResponse(true);
    	}).all('/administrator');
        //POST
        this.resursaPost = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setFullResponse(true);
        }).all('/administrator');
    }
	getData () {
		return this.resursaGet.getList().then(function (response) {
             return response;
         });
	}
    postData (params) {
        return this.resursaPost.post(params).then(function (response) {
             return response;
         });
    }
}

serviceAdministrator.$inject = ['Restangular'];