const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins (or put your Artemis URL here for security)
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2', 'x-frame-options', 'content-security-policy']
}).listen(port, host, function() {
    console.log('Artemis Proxy running on ' + host + ':' + port);
});
