export interface ITemplate {
  md_data: string,
  title: string
}

export abstract class BaseTemplate {
  public config: ITemplate | null = null
  public file: string | null = null
}
