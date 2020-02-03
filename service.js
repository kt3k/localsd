const WebSocket = require('ws')
const { defaultWsPort } = require('./package')

module.exports = service

const RECONNECT_DELAY = 3000

function service({ service, description, port, wsPort } = {}) {
  connect(service, description, port, wsPort || defaultWsPort)
}

async function connect(service, description, port, wsPort) {
  const ws = new WebSocket(`ws://localhost:${wsPort}`)
  await new Promise(resolve => {
    ws.on('close', () => {
      console.log('closed')
      resolve()
    })

    ws.on('error', () => {
      console.log('errored')
    })

    ws.on('open', () => {
      console.log('opened')
      ws.send(JSON.stringify({ service, description, port }))
    })

    ws.on('message', msg => {
      console.log(msg)
    })
  })

  setTimeout(() => {
    connect(service, description, port, wsPort)
  }, RECONNECT_DELAY)
}
