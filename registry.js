const http = require('http')
const ws = require('ws')
const assert = require('assert')
const { defaultWsPort, defaultHttpPort } = require('./package')

module.exports = registry

function registry({ httpPort, wsPort } = {}) {
  httpPort = httpPort || defaultHttpPort
  wsPort = wsPort || defaultWsPort
  const wss = new ws.Server({ port: wsPort })

  const registry = new Registry()

  const server = http
    .createServer((req, res) => {
      res.write(JSON.stringify(registry.getList()))
      res.end()
    })
    .listen(httpPort, () => {
      console.log(`http server started at localhost:${httpPort}`)
    })

  wss.on('connection', ws => {
    let service

    ws.on('message', msg => {
      if (service) {
        ws.send(`You are already registered on port ${service.port}`)
        return
      }
      try {
        service = JSON.parse(msg)
        assert(typeof service.service === 'string')
        assert(typeof service.port === 'number')
      } catch (e) {
        // Got invalid message.
        // Closes the connection.
        console.log(e)
        ws.send(e.toString())
        ws.close()
        return
      }

      registry.register(service)
      console.log(`Registering port=${service.port} service=${service.service}`)
      ws.send(
        `Registered you on port=${service.port} service=${service.service}`
      )
    })

    ws.on('close', () => {
      console.log(
        `Unregistering port=${service.port} service=${service.service}`
      )
      registry.unregister(service)
    })
  })
}

class Registry {
  constructor() {
    this.registry = {}
  }

  register(service) {
    this.registry[service.port] = service
  }

  unregister(service) {
    delete this.registry[service.port]
  }

  get() {
    return this.registry
  }

  getList() {
    return Object.keys(this.registry).map(key => this.registry[key])
  }
}
