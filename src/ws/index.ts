import { IncomingMessage, Server } from 'http';
import WebSocket from 'ws';
import { parse as parseQuery } from 'query-string';

export default (expressServer: Server) => {
  const wsServer = new WebSocket.Server({
    noServer: true,
    path: '/ws',
  });

  expressServer.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (websocket) => {
      wsServer.emit('connection', websocket, request);
    });
  });

  wsServer.on(
    'connection',
    (socket: WebSocket.WebSocket, request: IncomingMessage) => {
      if (!request || !request.url) {
        return;
      }

      const [_path, params] = request?.url?.split('?');
      const connectionParams = parseQuery(params);

      // NOTE: connectParams are not used here but good to understand how to get
      // to them if you need to pass data with the connection to identify it (e.g., a userId).
      console.log(connectionParams);

      socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        console.log(parsedMessage);
      });
    },
  );

  return wsServer;
};
