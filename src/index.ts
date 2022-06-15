import express from 'express';
import dotenv from 'dotenv';
import ws from './ws';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// TODO: Add middleware here

const server = app.listen(port, () => {
  if (process.send) {
    // eslint-disable-next-line no-console
    console.log(`Server listening at http://localhost:${port}`);
  }
});

// Setup endpoint for Websocket Server
ws(server);
