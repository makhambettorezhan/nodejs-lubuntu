const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.end('Hello World');
});
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

app.listen(PORT, () => {
  console.log('Server is up for port', PORT);
});