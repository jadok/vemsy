const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const compileSass = (src: string, dist: string) => {
  sass.render({
    file: src,
    outFile: dist,
    sourceMap: true,
  }, (error: any, result: any) => { // node-style callback from v3.0.0 onwards
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
  })
}

export default compileSass
