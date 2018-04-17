const app = require('../app');
const https = require('https');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 8081;
app.set('port', port);


const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    requestCert: false,
    rejectUnauthorized: false,
};

https.createServer(options, app).listen(port, () => {
    console.log('server running at ' + port);
});
