//todo, Make recusrive
function toPHP(value,parents){
  var php = "$form['" + value.label + "'] = array(\n    '#type' => '" + value.element.id + "',\n";
  for(var i = 0; i < value.attributes.length; i++){
    php+="    '#" + value.attributes[i].attribute.name + "' => " + value.attributes[i].value + ",\n";
  }
  php+=");"
  return php; 
}


function toEditList(value){
  var html = '<li id="item-' + value.id + '"><div><strong>' + value.label + '</strong> : <em>' + value.element.id + '</em>';
  html += '<div class="btn-group">';
  html += '<a href="#/edit/' + value.id + '" class="btn" title="Edit"><i class="icon-pencil"></i></a>';
  html += '<a href="#/remove/' + value.id + '" class="btn" title="Remove"><i class="icon-trash"></i></a>';
  html += '</div></div>';
  if(value.children.length){
    html += "<ol>" + _.map(value.children, function(childVal){return toEditList(childVal);}).join("\n") + "</ol>";
  }
  html += "</li>";
  return html;
}