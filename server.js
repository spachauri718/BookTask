const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync().then(() => {
  console.log("Database synchronized.");
}).catch(err => {
  console.error("Failed to synchronize database:", err);
});

// Routes
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/books', require('./routes/book.routes.js'));
app.use('/api/users', require('./routes/user.routes.js'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
