import { Express } from 'express'

export default abstract class View {
  constructor(app: Express, viewPath: string) {
    this.setEngine(app, viewPath)
  }
  public abstract setEngine(app: Express, viewPath: string): void
}
