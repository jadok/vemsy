import app from './app'

const port: number = parseInt(process.env.PORT, 10) || 9999

app.listen(port, () => {
  console.log(`dirname: ${__dirname}`)
  console.log(`filename: ${__filename}`)
  console.log(`Process: ${process.cwd()}`)
  console.log(`Server running on ${port}`);
})
