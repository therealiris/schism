export default function copyElementText(element) {
  let _was_disabled = false
  var _success = false

  // if input
  if(element && element.select) {
    // if disabled then enable element
    if(element.disabled) {
      element.disabled = false
      _was_disabled = true
    }

    element.select();
    _success = document.execCommand('copy')
    if(_success) console.log("Copy success!")
    else console.log("Copy failed");

    // disable input back
    if(_was_disabled) element.disabled = true
  }
  else {
    var range = document.createRange();
    range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    _success = document.execCommand('copy')
    if(_success) console.log("Copy success!")
    else console.log("Copy failed");
  }

  return _success
}
