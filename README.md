# localsd v0.2.0

> Localhost Service Discovery service

Do you have many services hosted in localhost like `localhost:NNNN`? Do you often forget which service is hosted at which port number?

`localsd` helps you finding which service is hosted in which port number in your localhost.

# Usage

You need to have node.js installed.

First run the registry:

```sh
npx localsd --registry
```

This starts http server on port 32000, websocket server on port 36951. You can see which service is registered on the page `http://localhost:32000`.

Then run your service. After your service started, you need to run the following command:

```
npx localsd --service my-service --description "This is my service" --port 2020
```

This registers the service to the registry with the given service name `my-service`, the description `This is my service`, the port number `2020`.

If your service ended, you should stop the above command as well.

## Node.js service

If your service is implemented in node.js, you can use following code to register the service:

```js
require('localsd').service({
  name: 'my-service',
  description: 'This is my service',
  port: 2020
})
```

## Localsd Protocol

You can register localsd service in any language using websocket.

You can register your service with websocket connection with the follwoing message in JSON format.

```json
{
  "service": "The name of your service",
  "port": portNumber,
  "description": "Description of your service"
}
```

For example, your can register your service with [websocat][] cli with the follwoing commands:

```
$ websocat ws://localhost:36951
{ "service": "my-service": "port": 8080, "description": "My example service" }
```

# License

BlueOak-1.0.0

[websocat]: https://github.com/vi/websocat
