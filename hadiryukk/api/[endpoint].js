module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, nip, User-Agent');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const endpoint = req.query.endpoint;
    if (!endpoint) {
        res.status(400).json({ error: 'Endpoint required' });
        return;
    }

    const url = `https://spreso.bmkg.go.id/api-mobile-presence/index.php/api/v2/${endpoint}`;

    const headers = {
        'User-Agent': 'Dart/3.11 (dart:io)',
        'Content-Type': 'application/json'
    };

    if (req.headers['x-api-key']) headers['x-api-key'] = req.headers['x-api-key'];
    if (req.headers['nip']) headers['nip'] = req.headers['nip'];

    try {
        const options = { method: req.method, headers };
        if (req.method === 'POST' && req.body) {
            options.body = JSON.stringify(req.body);
        }
        const response = await fetch(url, options);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}