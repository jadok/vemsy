import { join } from 'path'

export const filePathToPath = (filePath) =>
  join(process.cwd(), ...filePath.split('/'))

export const getAssetPathFromPage = (pagePath, assetFilename) => {
  const assetFilenameSplitted = assetFilename.split('/')
  return (assetFilename.startsWith('/') ?
    join(...assetFilenameSplitted)
    : join(pagePath, ...assetFilenameSplitted))
}

export default filePathToPath
