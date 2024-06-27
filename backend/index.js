const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// require('dotenv').config();

const homeRouter = require("./routes/index");

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// Routes
app.use('/', homeRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});