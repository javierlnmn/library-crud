const express = require('express');
const app = express();
const port = 1200; // Set your preferred port number

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using static automatically allows the
app.use(express.static(__dirname + 'public/'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}\nServer's url: http://localhost:${port}/`);
});
