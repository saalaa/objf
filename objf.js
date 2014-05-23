module.exports = function () {
  var formatters = {};

  return function objf (id, that) {
    // Register a formatter.
    if (typeof that === 'function') {
      formatters[id] = that;
    }
    else {
      // Format an array.
      if (Array.isArray(that)) {
        return Array.prototype.map.call(that, formatters[id]);
      }
      // Format an object.
      else {
        return formatters[id](that);
      }
    }
  };
};
