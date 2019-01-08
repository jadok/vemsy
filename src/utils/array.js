const filters = {
  onlyUnique: (value, index, self) => self.indexOf(value) === index
}

export const arrayUnique = arr => arr.filter(filters.onlyUnique)

/**
 * Compare 2 arrays.
 *
 * @param arr1
 *   first array
 * @param arr2
 *   second array
 *
 * @return {boolean}
 *   True if the 2 arrays are equalds.
 */
export const arrayCompare = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  return arr1.reduce((acc, curr, index) => {
    if (curr !== arr2[index]) {
      return false
    }
    return acc
  }, true)
}
