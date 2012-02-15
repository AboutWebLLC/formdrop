angular.service('Element', function($resource) {
 return $resource('data/:elementId.json', {}, {
   query: {method: 'GET', params: {elementId: 'elements'}, isArray: true},
 });
});

angular.service('Attribute', function($resource) {
 return $resource('data/attributes.json', {}, {
   query: {method: 'GET', params: {}, isArray: true},
 });
});