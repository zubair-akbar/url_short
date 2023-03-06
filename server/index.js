import express from 'express';
import cors from 'cors';
const app = express()
const PORT = 3001;
import { postUrl } from '../database/controller/controller.js';
import { getUrls } from '../database/controller/controller.js';

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});