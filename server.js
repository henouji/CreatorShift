const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const distPath = path.join(__dirname, 'dist/automation-app/browser');

// Serve static files from the Angular app build directory
app.use(express.static(distPath));

// Handle SPA routing - check if file exists, if not serve index.html
app.use((req, res, next) => {
  const filePath = path.join(distPath, req.path);
  
  // Check if the requested file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, serve index.html for SPA routing
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      // File exists, let express.static handle it
      next();
    }
  });
});

// Get port from environment variable or default to 8080
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`App is available at http://localhost:${port}`);
});