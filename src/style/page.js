import { arrayUnique } from '../utils/array.js'
import { getAssetPathFromPage } from '../utils/path.js'

export const getStyleFilesFromPages = async (manager, pages) => {
  const styleFiles = []
  pages.forEach((page) => {
    if (page.style) {
      styleFiles.push(getAssetPathFromPage(page.name, page.style.file))
    }
    if (page.globalStyle) {
      styleFiles.push(getAssetPathFromPage(page.name, page.globalStyle.file))
    }
  })
  const compilerPromises = arrayUnique(styleFiles)
    .map((styleFile) => manager.compile(styleFile))
  return Promise.all(compilerPromises)
}
