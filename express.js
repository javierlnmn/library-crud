const express = require('express');
const app = express();
const port = 1200; // Set your preferred port number

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}\nServer's url: http://localhost:${port}/`);
});
