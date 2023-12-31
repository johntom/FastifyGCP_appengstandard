/**
 * @param {Function} func
 * @param {Number} timeout
 * @returns {Function}
 */
export default function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
