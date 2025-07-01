const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000; // You can choose any available port

// Use CORS middleware
// You can configure CORS options as needed
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Login Endpoint
app.post('/signin', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Basic validation (you'll want more robust validation in a real app)
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // For this boilerplate, we'll just send a success message.
  console.log(`Login attempt for: ${email}`);
  // db simulation
  if (email === 'user@example.com' && password === 'Password123.') {
    return res.status(200).json({ message: 'Login successful!', user: { email: email } });
  } else {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});