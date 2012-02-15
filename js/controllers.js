function AppCtrl($route,$cookieStore,$browser) {
		var self = this; 
    // define routes
    $route.when("/add/:elementId", {template:'views/elementForm.html', controller:ElementFormCtrl});
    $route.when("about", {template:'views/about.html', controller:AboutCtrl});
    $route.when("help", {template:'views/help.html', controller:HelpCtrl});
		$route.parent(this);   
		self.drupalForm = [];
		self.code = "";
		self.render = function(){
			self.code =  "<?php\n\n" + _.map(self.drupalForm, function(value){return toPHP(value,[]);}).join("\n\n") + "\n\n?>";
			$browser.defer(function(){
				prettyPrint();
			},200);
		}
}


function toPHP(value,parents){
	var php = "$form['" + value.label + "'] = array(\n    '#type' => '" + value.element.id + "',\n";
	for(var i = 0; i < value.attributes.length; i++){
		php+="    '#" + value.attributes[i].name + "' => " + value.attributes[i].value + ",\n";
	}
	php+=");"
	return php; 
}

function QuickAddCtrl(Element, $route, $location) {
	var self = this;
  this.elements = Element.query();
	this.slctElement = "checkbox";
	this.addElement = function(elementId){
		$location.updateHash("/add/"+self.slctElement);
	}
}

function AboutCtrl(){
	var self = this;
}
function HelpCtrl(){
	var self = this;
}

ElementFormCtrl.$inject = ['Element','Attribute','$route','$location','$cookieStore','$browser'];
function ElementFormCtrl(Element, Attribute, $route, $location, $cookieStore, $browser){ 
	var self = this; 
	
	//set this form up
	self.form = {attributes:[],
							 element:{},
							 label:"",
							 children:[]}
	
	//Get the attributes
	self.attributes = Attribute.query();
	
	//get the element details
 	self.element = Element.get({elementId: $route.current.params.elementId}, function(element) { 
		self.form.element = element;
		self.form.label = element.name;
	});
	
	self.addAttribute = function(){
		angular.Array.add(self.form.attributes,{"name" : self.element.attributes[0].name, "value": ""});
	}
	
	self.save = function(){
		angular.Array.add(self.$parent.drupalForm,angular.Object.copy(self.form));
		self.$parent.render();
		$location.updateHash(""); 
	}
	
	$browser.defer(function(){
			$('.collapse').collapse();
		}, 10);
}