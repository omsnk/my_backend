const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Function to check if a number is prime
function isPrime(num) {
  // Convert to integer
  num = Math.floor(num);
  
  // Numbers less than 2 are not prime
  if (num < 2) {
    return false;
  }
  
  // 2 is prime
  if (num === 2) {
    return true;
  }
  
  // Even numbers (except 2) are not prime
  if (num % 2 === 0) {
    return false;
  }
  
  // Check odd divisors up to sqrt(num)
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  
  return true;
}

// API endpoint to check if a number is prime
app.post('/check-prime', (req, res) => {
  const { number } = req.body;
  
  // Validate input
  if (number === undefined || number === null) {
    return res.status(400).json({
      error: 'Missing required parameter: number'
    });
  }
  
  // Check if input is a valid number
  if (typeof number !== 'number' || isNaN(number)) {
    return res.status(400).json({
      error: 'Input must be a valid number'
    });
  }
  
  const result = isPrime(number);
  
  res.json({
    input: number,
    isPrime: result
  });
});

// GET endpoint for convenience (query parameter)
app.get('/check-prime', (req, res) => {
  const { number } = req.query;
  
  // Validate input
  if (!number) {
    return res.status(400).json({
      error: 'Missing required parameter: number'
    });
  }
  
  const num = parseInt(number, 10);
  
  if (isNaN(num)) {
    return res.status(400).json({
      error: 'Input must be a valid number'
    });
  }
  
  const result = isPrime(num);
  
  res.json({
    input: num,
    isPrime: result
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Prime Number API',
    endpoints: {
      'POST /check-prime': 'Send JSON body with "number" parameter',
      'GET /check-prime': 'Send query parameter ?number=<int>',
      'GET /health': 'Health check'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Prime Number API server is running on http://localhost:${PORT}`);
  console.log(`POST http://localhost:${PORT}/check-prime with JSON body: { "number": <int> }`);
  console.log(`GET http://localhost:${PORT}/check-prime?number=<int>`);
});
