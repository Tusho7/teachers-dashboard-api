import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.WS_PORT || 8081;
const wsServer = new WebSocketServer({ port });

wsServer.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

export default wsServer;
