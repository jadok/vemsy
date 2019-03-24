import { isAbsolute, dirname, sep } from 'path'

export const getAssetPathFromPage = (pagePath, assetFilename) => {
  console.log('Assets: ', pagePath, assetFilename)
  return (isAbsolute(assetFilename) ?
    assetFilename.slice(1)
    : dirname(pagePath) + sep + assetFilename)
}
