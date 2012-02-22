angular.module('formDrop.services', [], function($provide) {	
    //provide an Element service TODO: make it so you can switch between 6 and 7
   $provide.factory('ElementService', ['$resource', function(res){
      return res('data/7/:elementId.json', {}, {});
   }]);
   
   //provide an Attribute service
   $provide.factory('AttributeService', ['$resource', function(res){
      return res('data/7/attributes.json', {}, {});
   }]);
   
   //provide a service to store/manage the form
   $provide.service('FormService', FormServiceProvider);
});



function FormServiceProvider() {
  this.$get = ['$rootScope',  function ($rootScope) {
    var service = {drupalForm:[]};
    return service;
  }];
}