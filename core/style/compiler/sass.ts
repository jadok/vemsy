import { join } from 'path'

const sass = require('sass');
const fs = require('fs');

export const writeFileResult = (dist: string, result: any) => (err: any) => {
  if (!err) {
    console.log(dist + ' has been updated in ' + result.stats.duration + 'ms')
    return 0
  }
  // file written on disk.
  console.error('error writing', err, dist)
  return 1
}

export const sassResult = (dist: string) => (error: any, result: any) => {
  if (error) {
    console.error(error.status); // used to be "code" in v2x and below
    console.error(error.column);
    console.error(error.message);
    console.error(error.line);
  }
  else {
    // No errors during the compilation, write this result on the disk
    fs.writeFile(dist, result.css.toString(), writeFileResult(dist, result));
  }
}

/**
 * Compile sass file with result in callback
 *
 * @param fullFileName
 *   filename with extension.
 * @param src
 *   style folder.
 * @param dist
 *   outfile name.
 * @param result
 *   callback to handle the result of the compilation of the sass file.
 */
export const sassCompile = (
  fullFileName: string,
  src: string,
  dist: string,
  result: (err: any, res: any) => any = sassResult(dist)) =>
    sass.render({
      file: join(src, fullFileName),
      outFile: dist,
      sourceMap: true,
    }, result)

export default sassCompile
