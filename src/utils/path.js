import { isAbsolute, dirname, sep } from 'path'

export const getAssetPathFromPage = (pagePath, assetFilename) => {
  return (isAbsolute(assetFilename) ?
    assetFilename.slice(sep.length)
    : dirname(pagePath) + sep + assetFilename)
}
