
const cycle = (data, currentPath, set) => {
  const dataProperties = Object.keys(data)
  dataProperties.forEach((dataKey) => {
    const dataKeyPath = currentPath + '/' + dataKey
    if (dataKey.endsWith('.page')) {
      // set
      data[dataKey].name = dataKeyPath
      set.push(data[dataKey])
    }
    else {
      cycle(data[dataKey], dataKeyPath, set)
    }
  })
}

/**
 * 
 * @param {Object} data
 *   Json with instance object from 'include-all'
 *
 * @param {Array} set
 *   set Data if validate is OK.
 */
const routeInclude = (data, set) =>
  cycle(data, '', set)

export default routeInclude
