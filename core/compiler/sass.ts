const sass = require('sass');
const fs = require('fs');

export enum COMPILE_MODE {
  ASYNC = '',
  SYNC = 'Sync'
}

export const sassResult = (dist: any) => (error: any, result: any) => {
  if (error) {
    console.log(error.status); // used to be "code" in v2x and below
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    // No errors during the compilation, write this result on the disk
    fs.writeFile(dist, result.css, (err: any) => {
      if (!err) {
        console.log(dist + ' has been updated in ' + result.stats.duration + 'ms')
      }
      else {
        // file written on disk.
        console.log('error writing')
      }
    });
  }
}

export const sassCompile = (
  src: string,
  dist: string,
  result: (err: any, res: any) => any = sassResult(dist)) =>
    sass.render({
      file: src,
      outFile: dist,
      sourceMap: true,
    }, result)


export default sassCompile
