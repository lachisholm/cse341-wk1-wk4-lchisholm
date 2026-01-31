const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');

dotenv.config();



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const routes = require('./routes');
app.use('/', routes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root health check
app.get('/', (req, res) => {
  res.send('CSE 341 Contacts API is running');
});

// Server
const db = require('./db/connect');

const port = process.env.PORT || 8080;

db.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
