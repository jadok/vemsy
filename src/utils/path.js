import { isAbsolute, dirname, sep } from 'path'

export const getAssetPathFromPage = (pagePath, assetFilename) => {
  return (isAbsolute(assetFilename) ?
    assetFilename.slice(1)
    : dirname(pagePath) + sep + assetFilename)
}

export default filePathToPath
