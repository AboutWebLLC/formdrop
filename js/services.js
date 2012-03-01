angular.module('formDrop.services', [], function($provide) {	
    //provide an Element service TODO: make it so you can switch between 6 and 7
   $provide.factory('ElementService', ['$resource', function(res){
      return res('data/7/:elementId.json', {}, {});
   }]);
   
   //provide an Attribute service
   $provide.factory('AttributeService', ['$resource', function(res){
      return res('data/7/attributes.json', {}, {});
   }]);
   
	/**
	  * if Angular's nextUid() was exposed to the API, we'd use that. But since we probably won't 
		* have enough form elements for an overrun, I think a simple int counter will do
		*/
	var seed = 0;	
	
	//FormService provider
	var formServiceProvider = function() {
		this.$get = ['$rootScope',  function ($rootScope) {
			var drupalForm = [],
					service = {drupalForm : drupalForm,
										 save : function(formElement){
											 var toSave = findFormElementById(formElement.id, drupalForm);
											 if(toSave){
												 toSave = formElement;
											 }else{
												 drupalForm.push(formElement);
											 }
										 },
										 remove : function(id){
											 removeFormElementById(id, drupalForm);
										 },
										 newForm : function(element){
											 seed++;
											 return {id:seed, element: element, label: element.id, attributes: [], children: []};										 
										 },
										 getById : function(id){
											 return findFormElementById(id, drupalForm);
										 },};
			return service;
		}];
	}
	
	/**
	 * attempts to find the item in the tree
	 * returns true if removed
	 * returns fals if not
	 */
	var removeFormElementById = function(id, form){
		for(var i = 0; i < form.length; i++){
			if(form[i].id == id){
				form.splice(i,1);
				return true;
			}
			if(form[i].children.length) {
				var child = removeFormElementById(id, form[i].children);
				if(child) return true;
			}
		}
		return false;
	}
	
	/**
	 * attempts to find the item in the tree
	 */
	var findFormElementById = function(id, form){
		for(var i = 0; i < form.length; i++){
			if(form[i].id == id) return form[i];
			if(form[i].children.length) {
				var child = findFormElementById(id, form[i].children);
				if(child) return child;
			}
		}
		return null;
	}
	
   //provide a service to store/manage the form
   $provide.service('FormService', formServiceProvider);
	 
	 
	
});
