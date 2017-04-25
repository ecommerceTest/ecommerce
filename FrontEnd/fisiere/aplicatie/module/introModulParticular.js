import uiRouter from 'angular-ui-router';
import restangular from 'restangular';

// UI-VIEW CONTROLLER
import controllerPrincipal from './controller/controllerPrincipal.js';
import listaController from './controller/listaController.js';
import cartController from './controller/cartController.js';
import adminController from './controller/adminController.js';
import creareController from './controller/creareController.js';
import gestionareController from './controller/gestionareController.js';
import comenziController from './controller/comenziController.js';

// SERVICE

export default angular.module('modulParticular', ['ui.router','ngMessages','restangular'])
.controller('controllerPrincipal', controllerPrincipal)
.controller('listaController', listaController)
.controller('cartController', cartController)
.controller('adminController', adminController)
.controller('creareController', creareController)
.controller('gestionareController', gestionareController)
.controller('comenziController', comenziController)

.config(['$qProvider','$urlRouterProvider','$stateProvider', 'RestangularProvider', function($qProvider, $urlRouterProvider,$stateProvider, RestangularProvider) {
	RestangularProvider.setBaseUrl('');
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
