/**
 * Factory function that returns funtion that sets a timeout, but calling it
 * repeatedly will cause only the last one to be executed
 */
export default function debouncedTimeout(timerFunc, period) {
  var timer_id = null
  return function() {
    if(timer_id) {
      clearTimeout(timer_id)
    }
    timer_id = setTimeout(timerFunc, period)
  }
}
