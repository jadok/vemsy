export interface IStyleCompiler {
  matchExtension(filename: string): boolean;
  compile(fileDirs: string[], srcTheme: string, publicPath: string)
  resolver(filename: string): string
}