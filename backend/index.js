const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 80;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
