export default class serviceTrimiteComanda {
    constructor(Restangular) {
        //POST
        this.resursaPost = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setFullResponse(true);
        }).all('/comenzi');
    }
    postData (params) {
        return this.resursaPost.post(params).then(function (response) {
             return response;
         });
    }
}

serviceTrimiteComanda.$inject = ['Restangular'];