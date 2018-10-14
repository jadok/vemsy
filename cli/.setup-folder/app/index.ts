import { App } from 'vemsy'

const app: any = new App()

const port: number = typeof process.env.PORT !== 'undefined' ?
  parseInt(process.env.PORT, 10) : 9999

app.setLoggers()
app.setPublic()
app.setContentEngine()
app.setTheme()
app.routes()
app.express.listen(port, () => {
  console.log(`dirname: ${__dirname}`)
  console.log(`filename: ${__filename}`)
  console.log(`Process: ${process.cwd()}`)
  console.log(`Server running on ${port}`);
})
