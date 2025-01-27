const express = require('express');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser');
const port = 3000;
const path = require('path')

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParse.json({ limit: '10mb'}))

app.use('/uploads', express.static(path.join('uploads')));
app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('uploads', filename);
  res.download(filePath, filename, (err) => {
    if (err) {
        res.status(500).send('File not found');
    }
});
});

readdirSync('./routes')
  .map((r) => app.use('/api', require('./routes/' + r)))


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
});