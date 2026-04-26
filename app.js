const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

const htmlPages = [
  "index",
  "contact",
  "galerie",
  "house-details",
  "reservation",
  "test-api",
];

for (const page of htmlPages) {
  const htmlFile = `${page}.html`;
  const routePath = page === "index" ? "/" : `/${page}`;

  app.get(routePath, (_req, res) => {
    res.sendFile(path.join(publicDir, htmlFile));
  });

  app.get(`/${htmlFile}`, (_req, res) => {
    res.sendFile(path.join(publicDir, htmlFile));
  });
}

// Catch-all route for SPA - must be the last route
app.use((_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
