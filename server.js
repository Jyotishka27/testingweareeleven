import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static assets and files from the root directory
app.use(express.static(__dirname));

// Root route serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback to HTML pages in pages/ directory if requested without .html
app.get('/:page', (req, res, next) => {
  const pageFile = path.join(__dirname, 'pages', `${req.params.page}.html`);
  res.sendFile(pageFile, (err) => {
    if (err) next();
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`We Are Eleven server running on http://0.0.0.0:${PORT}`);
});
