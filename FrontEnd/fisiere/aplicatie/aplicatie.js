import angular from 'angular';
import modulParticular from './module/introModulParticular.js';

angular.module('modulAplicatie', [
	'modulParticular'
]);

angular.bootstrap(document, ['modulAplicatie']);