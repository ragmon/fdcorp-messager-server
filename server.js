const WebSocket = require('ws');
const code = require('./codes');
const config = require('./config');

let wss;

function startServer(options, cb) {
    console.log('Starting fdcorp-messager-server...');

    // TODO: clear "options" before using into WebSocket server initialization

    wss = new WebSocket.Server(Object.assign(
        {
            host : "127.0.0.1",
            port : 55123,
            backlog : 100,
            maxPayload : 1000,
            perMessageDeflate: false
        },
        options
    ));

    // Setup max active clients connection
    if ('max_clients' in options && options['max_clients'] > 0) {
        wss.on('connection', function connection(ws) {
            if (wss.clients.size >= options['max_clients']) {
                ws.close(code.SERVER_ACTIVE_CONNECTIONS_EXCEEDED, 'Server active connections exceeded')
            }
        });
    }

    setupBroadcast();

    typeof cb == 'function' && cb();
}

function stopServer(cb) {
    console.log('Stopping fdcorp-messager-server...');

    console.log('Closing all active connections');
    wss.clients.forEach(function each(client) {
        client.close(code.SERVER_STOPPING, 'Server stopping');
    });

    wss.close(() => {
        console.log('fdcorp-messager-server closed');
        wss = null;
    });
}

function setupBroadcast() {
    console.log('Setup broadcast');

    // Broadcast to all (current connection).
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    // Feature connections
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(data) {
            // Broadcast to everyone else.
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });
    });
}


module.exports = {
    startServer,
    stopServer
};
