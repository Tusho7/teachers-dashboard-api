import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({ port: 8081 });

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
