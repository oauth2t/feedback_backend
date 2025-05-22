# Form Application Backend

This is the backend part of the form application built with Express.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The server will be available at http://localhost:3001

## API Endpoints

### POST /api/submit
Submit form data
- Request body: `{ name: string, email: string, age: number, message: string }`
- Response: `{ message: string }`

### GET /api/data
Get all submitted form entries
- Response: Array of form entries

## Features

- CORS enabled for frontend communication
- In-memory data storage
- Basic input validation
- Error handling 