const http = require('http');
const app = require('./app');
const port = process.env.PORT || 1312;
const ip = process.env.IP || '127.0.0.1';
const server = http.createServer(app);

server.listen(port, ip, function () {
  console.log(`Server started at ${ip} on port: ${port}`);
});
