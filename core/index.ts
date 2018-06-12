import * as express from 'express';

const port: number = parseInt(process.env.PORT, 10) || 9999;
const app: any = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome TS')
})

app.listen(port, () => {
  console.log(`Server running on ${port}`);
})
