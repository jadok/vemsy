import app from './app'

const port: number = parseInt(process.env.PORT, 10) || 9999;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
})
