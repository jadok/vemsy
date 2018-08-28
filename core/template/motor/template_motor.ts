import { Express } from 'express'

export default abstract class Template {
  constructor(app: Express, viewPath: string) {
    this.setEngine(app, viewPath)
  }
  public abstract setEngine(app: Express, viewPath: string): void
}
