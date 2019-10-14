const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {    
    super(options);
    this._limit =  options.limit;
    this._size = 0;
  }

  _transform(chunk, encoding, callback) {
    if( chunk ) {
      this._size += chunk.length;
    }

    if( this._size>this._limit ) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
