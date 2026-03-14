const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { initMongo } = require('./db/initMongo');

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Candidate Backend running on port ${PORT}`);
  // Initialize MongoDB: create collections + indexes on startup
  await initMongo();
});
