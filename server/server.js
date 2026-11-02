// Simple Express server to serve the React build and enable CORS
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
