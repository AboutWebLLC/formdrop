function AppCtrl($route, $scope, $browser, FormService, ElementService) { 
  //vars
  var elements = $scope.elements = ElementService.query({elementId:'elements'}),
      code = $scope.code = "";
  
  $scope.$on("render",function(){
      if(FormService.drupalForm.length){
        code += _.map(FormService.drupalForm, function(value){return toPHP(value,[]);}).join("\n\n");
      }else{
        code = "<?php \n //Empty form :( \n?>";
      }
      $('#code').text("<?php\n\n" + code + "\n\n?>");
      prettyPrint();
  });
}
function AboutCtrl(){
}

function HelpCtrl(){
}

function ElementFormCtrl(ElementService, FormService, $route, $location, $browser, $scope, $rootScope){ 
    //set this form up
  var form = $scope.form = {attributes: [],
                            element: {},
                            label: "",
                            children: []}
  
  //get the element details
   var element = $scope.element = ElementService.get({elementId: $route.current.params.elementId}, function(element) { 
     form.element = element;
     form.label = element.id;
     //add default attributes
     for(var i = 0; i < element.attributes.length; i++){
       if(element.attributes[i].typical){
         form.attributes.push({"attribute":element.attributes[i],"value":element.attributes[i].value});
       }
     }
   });
  
  $scope.addAttribute = function(){
     form.attributes.push({"attribute":element.attributes[0],"value":""});
  }
  
  $scope.remove = function(idx){
     form.attributes.splice(idx, 1);
  }
  
  $scope.save = function(){
    FormService.drupalForm.push(angular.copy(form));
    $rootScope.$broadcast("render");
    $location.path("/");
  }
}
ElementFormCtrl.$inject = ['ElementService','FormService','$route','$location','$browser','$scope','$rootScope'];