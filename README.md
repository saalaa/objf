objf
====

Light, reusable object formatters (esp. for JSON APIs).

It allows registering formatter functions that can be used to process either on
objects or array of objects. It's especially useful for filtering data before
sending it over the wire.


Example
-------

```
#!javascript

// Require the package.
var objf = require('./objf');

// Obtain a registry that will store formatters and process
// data when needed.
objf = objf();

// Register the `message` formatter (synchronous).
objf('message', function (obj) {
  return {
    author: obj.author,
    message: obj.message
  };
});

// Process an object using the `message` formatter.
obj('message', {
  author: 'Ann',
  message: 'hi',

  // With potentially more attributes
  // from a database.
});

// Process an array of objects using the `message` formatter.
obj('message', [
  {
    author: 'Stefan',
    message: 'salut'
  },
  {
    author: 'Corey',
    message: 'hola'
  }
]);
```
