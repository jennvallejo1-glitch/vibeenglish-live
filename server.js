const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

let PORT = parseInt(process.env.PORT, 10) || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const ROOT_DIR = __dirname;
const AUTO_OPEN = process.argv.includes('--open');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg'
};

function getLocalNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

function resolveSafeFile(baseDir, reqUrl) {
  const targetPath = path.normalize(path.join(baseDir, reqUrl));
  if (!targetPath.startsWith(baseDir)) {
    return null;
  }
  return targetPath;
}

const server = http.createServer((req, res) => {
  let reqUrl = decodeURIComponent(req.url.split('?')[0]);
  if (reqUrl === '/') reqUrl = '/index.html';

  let filePath = resolveSafeFile(PUBLIC_DIR, reqUrl);
  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback al directorio raíz si el archivo existe allí
      const rootFallback = resolveSafeFile(ROOT_DIR, reqUrl);
      if (rootFallback && fs.existsSync(rootFallback) && fs.statSync(rootFallback).isFile()) {
        filePath = rootFallback;
      } else if (!path.extname(reqUrl)) {
        filePath = path.join(PUBLIC_DIR, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`404 Not Found: ${reqUrl}`);
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`500 Server Error: ${readErr.message}`);
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    });
  });
});

function openBrowser(url) {
  if (process.platform === 'win32') {
    exec(`start "" "${url}"`);
  } else if (process.platform === 'darwin') {
    exec(`open "${url}"`);
  } else {
    exec(`xdg-open "${url}"`);
  }
}

function startServer(portToTry) {
  server.listen(portToTry, '0.0.0.0', () => {
    const localUrl = `http://localhost:${portToTry}`;
    const networkIP = getLocalNetworkIP();
    console.log(`\n======================================================`);
    console.log(`🚀 VibeEnglish ejecutándose directamente en tu entorno:`);
    console.log(`👉 En esta computadora:  ${localUrl}`);
    if (networkIP) {
      console.log(`👉 En tu red local Wi-Fi: http://${networkIP}:${portToTry}`);
    }
    console.log(`======================================================\n`);

    if (AUTO_OPEN) {
      openBrowser(localUrl);
    }
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Puerto ${PORT} en uso, probando puerto ${PORT + 1}...`);
    PORT++;
    startServer(PORT);
  } else {
    console.error('Server error:', err);
  }
});

startServer(PORT);
