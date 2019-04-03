const server = require('./server');
const config = require('./config');

config.loadServerConfiguration(function (data) {
    server.startServer(data, () => {
        console.log(`Listening at ${data.host}:${data.port}`);
    });
});
