import { join } from 'path'

const sass = require('sass');
const fs = require('fs');

export enum COMPILE_MODE {
  ASYNC = '',
  SYNC = 'Sync'
}

export const sassResult = (dist: any) => (error: any, result: any) => {
  if (error) {
    console.error(error.status); // used to be "code" in v2x and below
    console.error(error.column);
    console.error(error.message);
    console.error(error.line);
  }
  else {
    // No errors during the compilation, write this result on the disk
    fs.writeFile(dist, result.css.toString(), (err: any) => {
      if (!err) {
        console.log(dist + ' has been updated in ' + result.stats.duration + 'ms')
      }
      else {
        // file written on disk.
        console.error('error writing', err, dist)
      }
    });
  }
}

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
