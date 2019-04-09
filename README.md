# openfaas-template-armhf-mulitarch

A collection of [multiarch](https://hub.docker.com/u/multiarch)-based [openfaas](https://www.openfaas.com/) templates for armhf

i.e.

Build on x86_64, run on a armhf-based openfaas (e.g. a raspberry pi running openfaas)

## How

### Setup multiarch on a x86_64 host
```sh
docker run --rm --privileged multiarch/qemu-user-static:register --reset
```

### Pull templates
```sh
faas template pull https://github.com/tiborv/openfaas-template-armhf-mulitarch
```

### Setup your openfaas config e.g:
```yaml
# openfaas-example.yaml
provider:
  name: openfaas
  gateway: https://your-openfaas-gateway.example.com
functions:
  openfaas-example:
    lang: node-armhf-multiarch # or one of the other templates present in this repo
    handler: ./openfaas-example
    image: yourdockeruser/openfaas-example:latest
```

### Add a handler:
```js
// openfaas-example/handler.js
require('isomorphic-fetch')

module.exports = async (context) => {
    const resp = await fetch(`https://api.icndb.com/jokes/random`)
    const { value: { joke }} = await resp.json()
    return joke
}
```

```json
// openfaas-example/package.json
{
  "name": "function",
  "version": "1.0.0",
  "dependencies": {
    "isomorphic-fetch": "^2.2.1"
  }
}
```

### Deploy:
```sh
faas-cli up -f openfaas-example.yml 
```