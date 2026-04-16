const path = require('path');
const dotenv = require('dotenv');

// Load local overrides first, then fallback backup env.
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const fs = require('fs');
const https = require('https');
const app = require('./app');
const { initMongo } = require('./db/initMongo');

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Candidate Backend running on port ${PORT}`);
  // Initialize MongoDB: create collections + indexes on startup
  await initMongo();
});

// Optional HTTPS listener for LAN sharing / secure browser access.
const sslKeyPath = process.env.SSL_KEY_PATH;
const sslCertPath = process.env.SSL_CERT_PATH;
const sslPort = Number(process.env.SSL_PORT || 0);
if (sslKeyPath && sslCertPath && sslPort > 0 && fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
  const tlsOptions = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
  };
  https.createServer(tlsOptions, app).listen(sslPort, '0.0.0.0', () => {
    console.log(`Candidate Backend HTTPS running on port ${sslPort}`);
  });
}
