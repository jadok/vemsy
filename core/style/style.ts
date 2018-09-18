export interface IStyleCompiler {
  /**
   * Check if the file is compiled by this class.
   *
   * @param {string} filename
   *   filename to be compiled.
   * @return {boolean}
   *   True if the file is compiled by this class.
   */
  matchExtension(filename: string): boolean;
  compile(fileDirs: string[], srcTheme: string, publicPath: string): void
  resolver(filename: string): string
}
