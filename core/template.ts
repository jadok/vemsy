import * as fs from 'fs'
import * as path from 'path'

const defaultString: string[] = []

/**
 * Find all files inside a dir, recursively.
 *
 * @param dir Dir path string.
 * @return Array with all file names that are inside the directory.
 */
const getAllFiles = (dir: fs.PathLike): string[] =>
  fs.readdirSync(dir).reduce((files: string[], file: string) => {
    const name: string = path.join(<string>dir, file);
    const isDirectory: boolean = fs.statSync(name).isDirectory();

    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  },
  defaultString
);

export default getAllFiles