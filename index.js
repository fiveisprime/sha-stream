var Transform = require('readable-stream').Transform;
var crypto    = require('crypto');
var util      = require('util');

//
// ShaSum constructor which inherits from Stream Transform.
//
// The constructor may be instantiated without use the `new` operator to support
//    piping to the module easily.
//
// `stream.pipe(require('sha-stream')('sha1')).pipe(...);`
//
function ShaSum(hash) {
  if (!(this instanceof Transform)) {
    return new ShaSum(hash);
  }

  Transform.call(this, arguments);

  this.digester = crypto.createHash(hash || 'sha1');
}

util.inherits(ShaSum, Transform);

//
// Add the transform behavior. Add the incremental data to the digester;
//    converts non-buffer data to a buffer.
//
ShaSum.prototype._transform = function (chunk, encoding, fn) {
  this.digester.update(Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk, encoding));
  fn();
};

//
// Add the flush behavior. This digests the hash and outputs the return value.
//
ShaSum.prototype._flush = function (fn) {
  this.push(this.digester.digest('hex'));
  fn();
};

module.exports = ShaSum;
