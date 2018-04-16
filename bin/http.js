const app = require('../app');
const http = require('http');

const port = parseInt(process.env.PORT, 10) || 8081;
app.set('port', port);


http.createServer(app).listen(port, () => {
    console.log('server running at ' + port);
});
