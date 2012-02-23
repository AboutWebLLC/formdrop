//todo, Make recusrive
function toPHP(value,parents){
  var php = "$form['" + value.label + "'] = array(\n    '#type' => '" + value.element.id + "',\n";
  for(var i = 0; i < value.attributes.length; i++){
    php+="    '#" + value.attributes[i].attribute.name + "' => " + value.attributes[i].value + ",\n";
  }
  php+=");"
  return php; 
}
