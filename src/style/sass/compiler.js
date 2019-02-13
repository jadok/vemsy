import { join } from 'path'

const sass = require('sass');
const fs = require('fs');

export const writeFileResult = (dist, result) => (err) => {
  if (!err) {
    console.log(dist + ' has been updated in ' + result.stats.duration + 'ms')
    return 0
  }
  // file written on disk.
  console.error('error writing', err, dist)
  return 1
}

export const sassResult = dist => (resolve, reject) => (error, result) => {
  if (error) {
    console.error(error.status)
    console.error(error.column)
    console.error(error.message)
    console.error(error.line)
    reject(error)
  }
  else {
    // No errors during the compilation, write this result on the disk
    fs.writeFile(dist, result.css.toString(), writeFileResult(dist, result))
    resolve()
  }
}

/**
 * Compile sass file with result in callback
 *
 * @param {string} fullFileName
 *   filename with extension.
 * @param {string} src
 *   style folder.
 * @param {string} dist
 *   outfile name.
 * @param result
 *   callback to handle the result of the compilation of the sass file.
 */
export const sassCompile = async (
  fullFileName,
  src,
  dist,
  result = sassResult(dist)) => new Promise(
    (resolve, reject) =>
    sass.render({
      file: join(src, fullFileName),
      outFile: dist,
      sourceMap: true,
    }, result(resolve, reject))
  )

export default sassCompile
