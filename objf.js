module.exports = function () {
  var formatters = {};

  return function objf (id, that) {
    // Register a formatter.
    if (typeof that === 'function') {
      formatters[id] = that;
    }
    else {
      // Provide a friendly error message.
      if (typeof formatters[id] === 'undefined') {
        throw new Error('objf/' + id + ' is not defined');
      }

      // Process an array.
      if (Array.isArray(that)) {
        return Array.prototype.map.call(that, formatters[id]);
      }
      // Process an object.
      else {
        return formatters[id](that);
      }
    }
  };
};
