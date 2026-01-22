# Prime Number API

A simple Node.js backend API that checks whether a given integer is a prime number.

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### POST /check-prime

Check if a number is prime using POST request.

**Request Body:**
```json
{
  "number": 17
}
```

**Response:**
```json
{
  "input": 17,
  "isPrime": true
}
```

### GET /check-prime

Check if a number is prime using GET request with query parameter.

**URL:** `http://localhost:3000/check-prime?number=17`

**Response:**
```json
{
  "input": 17,
  "isPrime": true
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK"
}
```

## Examples

### Using curl (POST)
```bash
curl -X POST http://localhost:3000/check-prime \
  -H "Content-Type: application/json" \
  -d '{"number": 17}'
```

### Using curl (GET)
```bash
curl "http://localhost:3000/check-prime?number=17"
```

## Prime Number Logic

The API uses an optimized algorithm:
- Numbers less than 2 are not prime
- 2 is prime
- Even numbers are not prime
- For odd numbers, check divisibility up to √n
