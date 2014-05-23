var should = require('should');
var objf = require('./objf');

function log (title, data) {
  if (process.env.DEBUG) {
    console.log([
      title + ':',
      JSON.stringify(data, null, 2)
    ].join('\n') + '\n');
  }
}


/*
 * Setup
 * -----
 */

// Obtain an objf function
var instance = objf();

// Simple formatter.
instance('message', function (obj) {
  return {
    author: obj.author,
    message: obj.message
  };
});

// Nested formatter.
instance('user', function (obj) {
  var messages = instance('message', obj.messages);

  return {
    name: obj.name,
    messages: messages
  };
});


/*
 * Test data
 * ---------
 */

var data = [
  {
    name: 'a',
    messages: [
      {
        date: '2014-01-01 10:00:00',
        author: 'b',
        message: 'hi'
      }
    ]
  },
  {
    name: 'b',
    messages: [
      {
        date: '2014-01-01 11:00:00',
        author: 'a',
        message: 'hi'
      },
      {
        date: '2014-01-01 12:00:00',
        author: 'a',
        message: 'how are you?'
      }
    ]
  }
];


/*
 * Tests
 * -----
 */

describe('Single objects', function () {

  it('should work', function (done) {

    var result = instance('message', data[0].messages[0]);

    log('Single object', result);

    result.should.have.property('author');
    result.should.have.property('message');
    result.should.not.have.property('date');

    done();

  });

});

describe('Single object with nested array of objects', function () {

  it('should work', function (done) {

    var result = instance('user', data[1]);

    log('Single object with nested array of objects', result);

    result.should.have.property('name');
    result.should.have.property('messages').lengthOf(2);
    result.messages[0].should.not.have.property('date');
    result.messages[0].should.have.property('author');
    result.messages[0].should.have.property('message');

    done();

  });

});

describe('Array of objects with nested array of objects', function () {

  it('should work', function (done) {

    var result = instance('user', data);

    log('Array of objects with nested array of objects', result);

    result.should.have.lengthOf(2);
    result[1].should.have.property('name');
    result[1].should.have.property('messages').lengthOf(2);
    result[1].messages[0].should.not.have.property('date');
    result[1].messages[0].should.have.property('author');
    result[1].messages[0].should.have.property('message');

    done();

  });

});

describe('Missing formatters', function () {

  it('should throw an exception', function (done) {

    (function () {
      var result = instance('xxx', 'yyy');
    }).should.throw();

    done();

  });

});
