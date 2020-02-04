const WebSocket = require("ws");
const { defaultWsPort } = require("./package");

module.exports = service;

const RECONNECT_DELAY = 3000;

function service({ service, description, port, wsPort } = {}) {
  connect(service, description, port, wsPort || defaultWsPort);
}

async function connect(service, description, port, wsPort) {
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
      ws.send(JSON.stringify({ service, description, port }));
    });

    ws.on("message", msg => {
      console.log(msg);
    });
  });

  setTimeout(() => {
    connect(service, description, port, wsPort);
  }, RECONNECT_DELAY);
}
