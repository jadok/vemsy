/**
 * List of filter functions
 */
const filters = {
  onlyUnique: (value, index, self) => self.indexOf(value) === index
}

// Add Array prototype

/**
 * Get unique values in the array.
 */
Array.prototype.unique = function () {
  return this.filter(filters.onlyUnique)
}

/**
 * Compare 2 arrays.
 *
 * @param {array} arr
 *   Array to compare
 *
 * @return {bool}
 *   true if each values of the arrays are equals
 */
Array.prototype.compare = function (arr) {
  if (this.length !== arr.length) {
    return false
  }
  return this.reduce((acc, curr, index) => {
    if (curr !== arr[index]) {
      return false
    }
    return acc
  }, true)
}
