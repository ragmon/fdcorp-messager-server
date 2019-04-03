/* Example:

{
    "host" : "duskgytldkxiuqc6.onion",
    "port" : "55123",
    "backlog" : "100",
    "maxPayload" : "1000",
    "max_clients" : 1000
}

*/

const fs = require('fs');

function loadServerConfiguration(cb) {
    fs.readFile('settings.json', 'utf-8', (err, data) => {
        if(err){
            console.error("An error ocurred reading the file: " + err.message);
            return;
        }

        cb(JSON.parse(data));
    });
}

module.exports = {
    loadServerConfiguration
}
