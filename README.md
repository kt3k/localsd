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

Then run your service. After your service started, you need to run the following command:

```
npx localsd --service my-service --description "This is my service" --port 2020
```

This registers the service to the registry with the given service name `my-service`, the description `This is my service`, the port number `2020`.

If your service ended, you should stop the above command as well.

# Node.js service

If your service is implemented in node.js, you can use following code to register the service:

```js
require('localsd').service({
  name: 'my-service',
  description: 'This is my service',
  port: 2020
})
```

# License

BlueOak-1.0.0
