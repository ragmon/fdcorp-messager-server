# FDCorp messager server

NodeJS websocket server for realtime chatting.

## Features

* broadcasting

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install NodeJS (v8.11) and npm packages:
* ws: ^6.2.0


```
sudo apt-get update \
    && sudo apt-get install node npm yarn
```

### settings.json

* `host` - websocket server host
* `port` - websocket server port
* `backlog` - the maximum length of the queue of pending connections
* `maxPayload` - the maximum allowed message size in bytes
* `max_clients` - max clients active connections

Example:

```
{
  "host" : "127.0.0.1",
  "port" : "55123",
  "backlog" : "100",
  "maxPayload" : "1000",
  "max_clients" : 1000
}
```

### Installation

Install application packages.

```
# Install with yarn
yarn

# Install with npm
npm install
```

### Running

```
# To run with yarn
yarn start

# To run with npm
npm start
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ragmon/keylogger/tags). 

## Authors

* **Arthur Ragimov** - *Initial work* - [ragmon](https://github.com/ragmon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
