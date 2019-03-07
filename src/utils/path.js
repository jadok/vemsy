import { join } from 'path'

export const filePathToPath = (filePath) =>
  join(process.cwd(), ...filePath.split('/'))

export const getAssetPathFromPage = (pagePath, assetFilename) => {
  const assetFilenameSplitted = assetFilename.split('/')
  const pageSplitted = pagePath.split('/')
  return (assetFilename.startsWith('/') ?
    join(...assetFilenameSplitted)
    : join(pageSplitted.slice(1, pageSplitted.length - 1).join('/'), ...assetFilenameSplitted))
}

export default filePathToPath
