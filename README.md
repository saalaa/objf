objf
====

Light, reusable object formatters (esp. for JSON APIs).


Example
-------

```
#!javascript

var objf = require('./objf');

objf = objf();

objf('message', function (obj) {
  return {
    author: obj.author,
    message: obj.message
  };
});

obj('message', {
  author: 'Ann',
  message: 'hi',

  // With potentially more attributes
  // from a database.
});

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
