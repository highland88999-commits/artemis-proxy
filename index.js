const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
    // Leaving this empty allows ALL origins during development
    originWhitelist: [], 
    
    requireHeader: [], 
    removeHeaders: [
        'cookie', 
        'cookie2', 
        'x-frame-options', 
        'content-security-policy',
        'content-security-policy-report-only'
    ],
    setHeaders: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
}).listen(port, host, function() {
    console.log('Artemis Proxy: DEVELOPMENT MODE ACTIVE. All origins allowed on port ' + port);
});
