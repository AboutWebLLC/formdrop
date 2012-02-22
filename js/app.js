'use strict';
/* http://docs.angularjs.org/#!angular.service */

// Declare app level module which depends on filters, and services
angular.module('formDrop', ['formDrop.services']).
run(['$route', '$window', '$rootScope',  function($route, $window, $rootScope) {

	// define routes
    $route.when("/add/:elementId", {template:'views/elementForm.html', controller:ElementFormCtrl});
    $route.when("/about", {template:'views/about.html', controller:AboutCtrl});
    $route.when("/help", {template:'views/help.html', controller:HelpCtrl});
		$route.otherwise({redirectTo: '/'});
		var self = this;
		//$route.parent(this);   	
		prettyPrint();
}]);
