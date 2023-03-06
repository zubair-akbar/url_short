const express = require('express')
const app = express()
var cors = require('cors')
const PORT = 3001;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});