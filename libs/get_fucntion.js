var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;

const getParamNames = (func) => {

  //console.log(typeof filter_badword);
  if (typeof func != 'function') {
    
    throw func;

  };
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null){
     result = [];
    };
  return result;
}

exports.getParamNames = getParamNames;