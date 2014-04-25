var Transform = require('readable-stream').Transform;
var crypto    = require('crypto');
var util      = require('util');

function ShaSum(hash) {
  if (!(this instanceof Transform)) {
    return new ShaSum(hash);
  }

  Transform.call(this, arguments);

  this.digester = crypto.createHash(hash || 'sha1');
}

util.inherits(ShaSum, Transform);

ShaSum.prototype._transform = function (chunk, encoding, fn) {
  this.digester.update(Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk, encoding));
  fn();
};

ShaSum.prototype._flush = function (fn) {
  this.push(this.digester.digest('hex'));
  fn();
};

module.exports = ShaSum;
