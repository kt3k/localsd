#!/usr/bin/env node
const assert = require('assert')
const { registry, version, help, service, group, port, description } = require('minimist')(process.argv.slice(2), {
  boolean: ['registry', 'version', 'help'],
  string: ['service', 'port', 'descrption', 'group'],
  alias: {
    h: 'help',
    v: 'version',
    s: 'service',
    p: 'port',
    d: 'description',
    g: 'group'
  }
})

if (registry) {
  require('../registry')()
} else {
  const portNumber = Number(port)
  assert(typeof service === 'string', 'service name not specified.')
  assert(service.length > 0, 'service name not specified.')
  assert(portNumber > 0, `service port is wrong: "${port}"`)

  require('../service')({
    service,
    group,
    port: portNumber,
    description
  })
}
