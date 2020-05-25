const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Serves Express Yourself website
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { getElementById, getIndexById, updateElement,
        seedElements, createElement } = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');


const PORT = process.env.PORT || 3000;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index.html');
  next();
});
app.get('/expressions', (req, res, next) => {
  res.send(expressions);
});

app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

app.put('/expressions', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    //updateElement(req.params.id, req.query, expressions);
    updateElement(req.body.id, {
      id: req.body.id,
      name: req.body.name,
      emoji: req.body.emoji
    }, expressions);
    console.log(req.body.emoji);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

app.post('/expressions', (req, res, next) => {
//  const receivedExpression = createElement('expressions', req.query);
  const receivedExpression = createElement('expressions', {
    id: req.body.id,
    name: req.body.name,
    emoji: req.body.emoji
  });

  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

app.delete('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

const animalsRouter = require('./animals');
app.use('/animals', animalsRouter);



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.post('/examples', (req, res, next) => {
	res.send(req.body);
});
