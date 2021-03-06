const WebSocket = require("ws");
const { defaultWsPort } = require("./package");

module.exports = service;

const RECONNECT_DELAY = 3000;

function service({ service, group, description, port, wsPort } = {}) {
  wsPort = wsPort || defaultWsPort
  connect({ service, group, description, port, wsPort });
}

async function connect({ service, group, description, port, wsPort }) {
  const wsUrl = `ws://localhost:${wsPort}`;
  const ws = new WebSocket(wsUrl);
  await new Promise(resolve => {
    ws.on("close", () => {
      resolve();
    });

    ws.on("error", () => {
      // Silently retry registering
    });

    ws.on("open", () => {
      console.log(`Registering to localsd service at ${wsUrl}`);
      ws.send(JSON.stringify({ service, group, description, port }));
    });

    ws.on("message", msg => {
      console.log(msg);
    });
  });

  setTimeout(() => {
    connect({ service, group, description, port, wsPort });
  }, RECONNECT_DELAY);
}
