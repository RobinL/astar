MYAPP.utilities = (function() {

var fu = MYAPP.functionalUtilities;

function flatten(arrays) {
    var result = [];
    fu.forEach(arrays, function (array) {
      fu.forEach(array, function (element){result.push(element);});
    });
    return result;
  }

  return {
  flatten:flatten
  }
})();