import { join } from 'path'

const filePathToPath = (filePath) =>
  join(process.cwd(), ...filePath.split('/'))

export default filePathToPath
