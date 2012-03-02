/**
 * Main controller, puts the code on the scree
 */
function AppCtrl($route, $scope, $browser, FormService, ElementService) { 
  //vars
  var elements = $scope.elements = ElementService.query({elementId:'elements'}),
      code = $scope.code = "",
      tree = $scope.tree = "";
  
  $scope.$on("render",function(){
      code = ""			
      tree = "";
      if(FormService.drupalForm.length){
        code += _.map(FormService.drupalForm, function(value){return toPHP(value,[]);}).join("\n\n");
        tree += "<ol class=\"sortable\">" + _.map(FormService.drupalForm, function(value){return toEditList(value);}).join("\n") + "</ol>";
      }else{
        code = "//Empty form :(";
        tree = "<ul></ul>";
      }
      $('#code').html("");
      $('#code').text("<?php\n\n" + code + "\n\n?>");			
			$('#tree').html(tree)
			$('#tree ol').nestedSortable({
				disableNesting: 'no-nest',
				forcePlaceholderSize: true,
				handle: 'div',
				helper:	'clone',
				items: 'li',
				opacity: .6,
				placeholder: 'placeholder',
				revert: 250,
				tabSize: 25,
				tolerance: 'pointer',
				toleranceElement: '> div',
				update: function(event, ui) {
						alert("drag and drop doesn't currently work, but it probably will soon.");	
				}
			});
      prettyPrint();
  });
}

/**
 * Remove Form Controller (Confirmation)
 */
function RemoveFormCtrl($scope, $route, $location, $rootScope, FormService){
  $scope.confirmRemove = function(){
    FormService.remove($route.current.params.elementId);
    $rootScope.$broadcast("render");
    $location.path("/");
  };
}

/**
 * Element Form Controller
 */
function ElementFormCtrl(ElementService, FormService, $routeParams, $location, $browser, $scope, $rootScope){ 
  //set this form up
  var form = $scope.form;
  var element = $scope.element = {},
      mode = $scope.mode = $location.$$path.split("/")[1];
			
  if(mode == "edit"){
    $scope.form = form = FormService.getById($routeParams.elementId);
    $scope.element = element = form.element;
  }else if(mode == "add"){
    //When adding a new element, initialize the form
    $scope.element = element = ElementService.get({elementId: $routeParams.elementId}, function(element) { 
    $scope.form = form = FormService.newForm(element);
    //add default attributes
    for(var i = 0; i < element.attributes.length; i++){
      if(element.attributes[i].typical){
          form.attributes.push({"attribute":element.attributes[i],"value":element.attributes[i].value});
        }
      }
    });
  }
  
  $scope.addAttribute = function(){
     form.attributes.push({"attribute":element.attributes[0],"value":""});
  }
  
  $scope.remove = function(idx){
     form.attributes.splice(idx, 1);
  }
  
  $scope.save = function(){
    FormService.save(form);
    $rootScope.$broadcast("render");
		$('.modal').modal('hide');
    $location.path("/");
  }
	
	$scope.close = function(){		
		$('.modal').modal('hide');
    $location.path("/");
	}
	
	$browser.defer(function(){$('.modal').modal({backdrop:'static'});},100);
}
ElementFormCtrl.$inject = ['ElementService','FormService','$routeParams','$location','$browser','$scope','$rootScope'];

//not sure if I'll even need these
function AboutCtrl(){
}

function HelpCtrl(){
}

