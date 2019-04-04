import '../utils/array.js'
import { getAssetPathFromPage } from '../utils/path.js'
import '../utils/object.js'

export const compileStyleFilesFromPages = async (manager, pages) => {
  const styleFiles = []
  pages.forEach((page) => {
    if (page.style) {
      styleFiles.push(getAssetPathFromPage(page.name, page.style.file))
    }
    if (page.globalStyle) {
      styleFiles.push(getAssetPathFromPage(page.name, page.globalStyle.file))
    }
  })
  const compilerPromises = styleFiles
    .unique()
    .map((styleFile) => manager.compile(styleFile))
  return Promise.all(compilerPromises)
}

export const getRealPathStylesFromActivePages = (manager, pages) => {
  const styleFiles = []
  pages.every((page) => {
    if (page.style) {
      const cloneStyle = page.style.cloneCustom()
      cloneStyle.file = manager.resolver(getAssetPathFromPage(page.name, page.style.file))
      styleFiles.push(cloneStyle)
    }
    if (page.globalStyle) {
      const cloneStyle = page.style.cloneCustom()
      cloneStyle.file = manager.resolver(getAssetPathFromPage(page.name, page.globalStyle.file))
      styleFiles.push(cloneStyle)
      return false // break
    }
    return true
  })
  return styleFiles
}
