import uiRouter from 'angular-ui-router';
import restangular from 'restangular';
import angularSanitize from 'angular-sanitize';

// UI-VIEW CONTROLLER
import controllerPrincipal from './controller/controllerPrincipal.js';
import listaController from './controller/listaController.js';
import cartController from './controller/cartController.js';
import adminController from './controller/adminController.js';
import gestionareController from './controller/gestionareController.js';
import comenziController from './controller/comenziController.js';

// SERVICE
import serviceComenzi from './service/serviceComenzi.js';
import serviceGestionare from './service/serviceGestionare.js';
import serviceAdministrator from './service/serviceAdministrator.js';
import serviceTrimiteComanda from './service/serviceTrimiteComanda.js';

export default angular.module('modulParticular', ['ui.router','ngMessages','restangular','ui.grid','ui.grid.edit', 'ui.bootstrap', 'ngAnimate', 'ngSanitize'])
.controller('controllerPrincipal', controllerPrincipal)
.controller('listaController', listaController)
.controller('cartController', cartController)
.controller('adminController', adminController)
.controller('gestionareController', gestionareController)
.controller('comenziController', comenziController)

.service('serviceComenzi', serviceComenzi)
.service('serviceGestionare', serviceGestionare)
.service('serviceAdministrator', serviceAdministrator)
.service('serviceTrimiteComanda', serviceTrimiteComanda)

.config(['$qProvider','$urlRouterProvider','$stateProvider', 'RestangularProvider', function($qProvider, $urlRouterProvider,$stateProvider, RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:3000');
	$qProvider.errorOnUnhandledRejections(false);
	$urlRouterProvider.otherwise('/lista');
	$stateProvider
	.state('lista', {
		url: '/lista',
		templateUrl: '../fisiere/aplicatie/module/pagini/lista.htm',
		controller:'listaController'
	})
	.state('cart', {
		url: '/cart',
		templateUrl: '../fisiere/aplicatie/module/pagini/cart.htm',
		controller:'cartController'
	})
	.state('gestionare', {
		url: '/gestionare',
		templateUrl: '../fisiere/aplicatie/module/pagini/gestionare.htm',
		controller:'gestionareController'
	})
	.state('comenzi', {
		url: '/comenzi',
		templateUrl: '../fisiere/aplicatie/module/pagini/comenzi.htm',
		controller:'comenziController'
	});
}]);
