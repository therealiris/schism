/**
 * Returns a function which when called will return random words
 */
export default function createRandomWordGenerator(words) {
  var _words = words
  var count = _words.length
  return function() {
    return _words[(Math.random() * (count - 1)).toFixed(0)]
  }
}
