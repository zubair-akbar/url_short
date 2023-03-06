import express from 'express';
import cors from 'cors';
const app = express()
const PORT = 3001;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});