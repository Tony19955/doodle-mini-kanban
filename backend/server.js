import cors from 'cors';
import express from 'express';
import db from './api/models/index.js';
import Routes from './api/routes/routes.js';

const app = express();

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch(err => {
    console.log("Cannot connect to database.", err);
    process.exit();
  });

app.use(cors()); 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

Routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});