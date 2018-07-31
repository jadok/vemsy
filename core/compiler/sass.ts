const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

const yourPathTotheFile = path.join('.', 'public', 'css', 'index.css')
const result = sass.render({
  file: path.join('.', 'app', 'themes', 'black', 'styles', 'index.scss'),
  outFile: yourPathTotheFile,
  sourceMap: true,
}, function (error: any, result: any) { // node-style callback from v3.0.0 onwards
  if (error) {
    console.log(error.status); // used to be "code" in v2x and below
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    
    // No errors during the compilation, write this result on the disk
    fs.writeFile(yourPathTotheFile, result.css, function(err: any){
      if (!err) {
        console.log(yourPathTotheFile + ' has been updated in ' + result.stats.duration + 'ms')
      }
      else {
        //file written on disk
        console.log('error writting')
      }
    });
  }
})
