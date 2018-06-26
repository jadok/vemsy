import { join } from 'path'

const filePathToPath = (filePath: string): string =>
  join(process.cwd(), ...filePath.split('/'))

export default filePathToPath
