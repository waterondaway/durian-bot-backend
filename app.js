const express = require('express');
const port = 3000;
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParse.json({ limit: '10mb'}))

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

readdirSync('./routes')
  .map((r) => app.use('/api', require('./routes/' + r)))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});