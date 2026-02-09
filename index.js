const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

// Identify your authorized domains
const authorizedOrigins = [
    'https://s-hub.vercel.app', // Your primary Hub
    'http://localhost:3000',    // Keep this for local development/testing
    'https://artemis-hub.vercel.app' // Add any other aliases you use
];

cors_proxy.createServer({
    originWhitelist: authorizedOrigins, // Only these sites can use your proxy
    requireHeader: [], // Keep this empty so iframes don't fail the header check
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
    console.log('Artemis Proxy: NEURAL LOCK ACTIVE. Authorized Origins: ' + authorizedOrigins.join(', '));
});
