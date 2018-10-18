export interface IStyleCompiler {
  /**
   * Check if the file is compiled by this class.
   *
   * @param filename
   *   filename to be compiled.
   * @return
   *   True if the file is compiled by this class.
   */
  matchExtension(filename: string): boolean;

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
  compile(fileDirs: string[], srcTheme: string, publicPath: string): void

  /**
   * Retrive the public path of the file compiled.
   *
   * @param filename
   *   filename
   */
  resolver(filename: string): string
}
