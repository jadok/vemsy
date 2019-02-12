export default class IStyleManager {

  /**
   * Check if the file is compiled by this class.
   *
   * @param filename
   *   filename to be compiled.
   * @return
   *   True if the file is compiled by this class.
   */
  isMatchedExtension(filename);


  /**
   * List of matching extensions.
   */
  matchExtensions = [];

  /**
   * Compile the files to the public path
   *
   * @param fileDirs
   *   list of files to compile.
   * @param srcTheme
   *   style theme folder.
   * @param publicPath
   *   public folder where the output file will be distributed.
   */
  compile(fileDirs, srcTheme, publicPath)

  /**
   * Retrive the public path of the file compiled.
   *
   * @param filename
   *   filename
   */
  renderUrl(filename)
}
