const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allows any site to use this proxy
    requireHeader: [],    // PATCH: Allows iframes to connect without custom headers
    removeHeaders: [
        'cookie', 
        'cookie2', 
        'x-frame-options', // Necessary to bypass "Refused to display in a frame" errors
        'content-security-policy',
        'content-security-policy-report-only'
    ],
    setHeaders: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    },
    // Optional: Help the proxy handle redirects more gracefully
    redirectSameOrigin: true,
    handleOptionsSuccess: true
}).listen(port, host, function() {
    console.log('Artemis Proxy: TRANSMISSION CLEAR on ' + host + ':' + port);
});
