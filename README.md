# 🛍️ Product API

A RESTful API for managing products, built with **Express.js** and **MongoDB**.

## 🚀 Features

- Authentication via API key
- Full CRUD operations for products
- Request validation with custom error handling
- Advanced capabilities:
  - Pagination (`page`, `limit`)
  - Filtering by category (`?category=...`)
  - Search by product name (`/search?name=...`)
  - Statistics by category (`/stats`)


## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd product-api
```

2. Install dependencies:
  ```bash
   npm install
  ```   

3. Create .env file based on .env.example:
API_KEY=your-secret-key
PORT=3000

4. Start the server:
For production:
```bash
npm start
```
For development (with auto-restart via nodemon):

```bash
npm run dev
```

## 📁 Project Structure

product-api/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── server.js
├── insertProducts.js
├── Week2-Assignment.pdf
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validation.js
├── errors/
│   ├── NotFoundError.js
│   └── ValidationError.js
├── models/
│   └── Product.js
├── routes/
│   └── products.js
└── .github/


## API Endpoints
All requests require the header:
`x-api-key: your-secret-key`

### 📦 Product Routes

| Method | Endpoint                       | Description                            |
|--------|--------------------------------|----------------------------------------|
| GET    | /api/products                  | Get all products (paginated, filtered) |
| GET    | /api/products/search           | Search products by name                |
| GET    | /api/products/:id              | Get a single product by ID             |
| POST   | /api/products                  | Create a new product                   |
| PUT    | /api/products/:id              | Update an existing product             |
| DELETE | /api/products/:id              | Delete a product                       |
| GET    | /api/products/stats            | Get product stats by category          |

---

## 🔍 Query Parameters

### `GET /api/products`

| Param     | Description                              |
|-----------|------------------------------------------|
| `page`    | Page number (default: `1`)               |
| `limit`   | Number of items per page (default: `10`) |
| `category`| Filter products by category              |

### `GET /api/products/search`

| Param  | Description              |
|--------|--------------------------|
| `name` | Search term (required)   |

---

## 📥 Sample Requests

### ✅ Create Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H 'x-api-key: your-secret-key' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Dell XPS 13",
    "price": 1399,
    "category": "Laptops",
    "brand": "Dell",
    "description": "13.4\" Laptop, Intel i7, 16GB RAM, 512GB SSD",
    "stock": 30,
    "images": ["https://example.com/dell-xps.jpg"],
    "rating": 4.6,
    "reviews": 42,
    "isFeatured": false
  }'
```


Get Paginated Products:
```bash
curl -X GET 'http://localhost:3000/api/products?page=1&limit=5&category=Laptops' \
  -H 'x-api-key: your-secret-key'

```

  Search Products:
```bash
  curl -X GET 'http://localhost:3000/api/products/search?name=macbook' \
  -H 'x-api-key: your-secret-key'


```

## Error Responses
Status Code            	Error Type	              Description
400                    	ValidationError	          Invalid request data
401	                    Unauthorized	            Missing or invalid API key
404                    	NotFoundError	            Resource not found
500                   	InternalError	            Server error

## Testing
To run tests:
```bash
npm test
```

## 👤 Author

**Chalonreay Bahati Kahindi**  
GitHub: @Vinci-Plath