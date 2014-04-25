var ShaSum = require('../');
var Transform = require('readable-stream').Transform;

require('chai').should();

describe('initialization', function () {
  it('should initialize', function () {
    var sha = new ShaSum('sha1');

    sha.should.exist;
    sha.should.be.instanceof(Transform);
  });
});
