var Lab = require('lab');
var Code = require('code');

var ShaSum = require('../');
var Stream = require('readable-stream');
var Transform = require('readable-stream').Transform;

var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;

describe('initialization', function () {
  it('should initialize', function (done) {
    var sha = new ShaSum('sha1');

    Code.expect(sha).to.exist();
    Code.expect(sha).to.be.instanceOf(Transform);

    done();
  });

  it('should transform a string when called with new', function (done) {
    var sha = new ShaSum('sha256');
    var s = new Stream.Readable();
    var out = '';

    s._read = function () {};
    s.push('test');
    s.push(null);

    s.pipe(sha).on('data', function (chunk) {
      out += chunk;
    });

    s.on('end', function () {
      Code.expect(out).to.equal('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');

      done();
    });
  });

  it('should transform a string without using new using the default', function (done) {
    var s = new Stream.Readable();
    var out = '';

    s._read = function () {};
    s.push('test');
    s.push(null);

    s.pipe(ShaSum()).on('data', function (chunk) {
      out += chunk;
    });

    s.on('end', function () {
      Code.expect(out).to.equal('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');

      done();
    });
  });
});
