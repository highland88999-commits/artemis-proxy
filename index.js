const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

// Dynamically check environment
const isProd = process.env.NODE_ENV === 'production';

// Your authorized domains
const defaultOrigins = [
    'https://s-hub.vercel.app',
    'http://localhost:3000',
    'https://artemis-hub.vercel.app',
    'https://nexusvortex.ca'
];

// Clean array parsing (removes accidental spaces or trailing slashes from Render env vars)
const envOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim().replace(/\/$/, '')) 
    : [];
const activeWhitelist = envOrigins.length > 0 ? envOrigins : defaultOrigins;

// Rate Limiting Config: "RequestsPerPeriod PeriodInMinutes"
// Default: 500 requests per 1 minute per IP. Change via Render Env Var: CORSA_RATELIMIT
const checkRateLimit = require('cors-anywhere/lib/rate-limit')(
    process.env.CORSA_RATELIMIT || '500 1' 
);

cors_proxy.createServer({
    // 1. NEURAL LOCK (Origin Verification)
    originWhitelist: isProd ? activeWhitelist : [], 

    // 2. DDoS & BOT PROTECTION
    checkRateLimit: checkRateLimit,

    // 3. DEEP HEADER STRIPPING (Unlocks Iframes)
    requireHeader: [], 
    removeHeaders: [
        'x-frame-options', 
        'content-security-policy',
        'content-security-policy-report-only',
        'strict-transport-security' // Prevents modern HSTS blocks
    ],

    // 4. SPOOFING & CACHING
    setHeaders: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    corsMaxAge: 86400, // Cache preflight requests for 24 hours to save CPU

    // 5. CLOAKING & STABILITY
    helpFile: '', // Hides the proxy identity from automated web scrapers
    httpProxyOptions: {
        xfwd: false, // Disables X-Forwarded-For headers for absolute privacy
        proxyTimeout: 30000 // 30-second kill switch for hanging connections
    }
}).listen(port, host, function() {
    console.log('=========================================');
    if (isProd) {
        console.log(`[SYS] ARTEMIS PROXY: PRODUCTION MODE`);
        console.log(`[SYS] NEURAL LOCK: ACTIVE`);
        console.log(`[SYS] AUTHORIZED: ${activeWhitelist.join(', ')}`);
    } else {
        console.log(`[SYS] ARTEMIS PROXY: DEVELOPMENT MODE`);
        console.log(`[SYS] NEURAL LOCK: DISABLED (All origins allowed)`);
    }
    console.log(`[SYS] PORT: ${port}`);
    console.log(`[SYS] RATE LIMIT: ${process.env.CORSA_RATELIMIT || '500 req/min'}`);
    console.log('=========================================');
});
