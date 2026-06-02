# Admin API Reference

## Base URL
```
http://localhost:3000/api
```

All endpoints require authentication (JWT token in cookies) except `/auth/login`.

## Authentication Endpoints

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "role": "admin"
  }
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Missing email or password
- `401` - Invalid credentials
- `429` - Too many login attempts

---

### Logout
```
POST /auth/logout
```

**Response:**
```json
{
  "success": true
}
```

---

## Products Endpoints

### Get All Products
```
GET /admin/products
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "C7 Iso Pro",
      "slug": "c7-iso-pro",
      "description": "Professional cricket helmet",
      "image": "https://example.com/image.jpg",
      "specs": {
        "color": "black",
        "size": "large"
      },
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Helmets"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "Helmets",
      "slug": "helmets"
    }
  ]
}
```

---

### Create Product
```
POST /admin/products
```

**Request Body:**
```json
{
  "name": "New Helmet",
  "categoryId": 1,
  "description": "Premium protection",
  "image": "https://example.com/helmet.jpg",
  "specs": {
    "material": "carbon fiber",
    "weight": "350g"
  }
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": 5,
    "name": "New Helmet",
    "slug": "new-helmet",
    "description": "Premium protection",
    "image": "https://example.com/helmet.jpg",
    "specs": { "material": "carbon fiber", "weight": "350g" },
    "categoryId": 1,
    "category": { "id": 1, "name": "Helmets" }
  }
}
```

**Status Codes:**
- `200` - Product created
- `400` - Missing required fields
- `401` - Unauthorized

---

### Update Product
```
PUT /admin/products
```

**Request Body:**
```json
{
  "id": 5,
  "name": "Updated Helmet Name",
  "categoryId": 2,
  "description": "Updated description",
  "image": "https://example.com/new-image.jpg",
  "specs": { "color": "red" }
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": 5,
    "name": "Updated Helmet Name",
    "slug": "updated-helmet-name",
    ...
  }
}
```

**Status Codes:**
- `200` - Product updated
- `400` - Invalid data
- `401` - Unauthorized
- `404` - Product not found

---

### Delete Product
```
DELETE /admin/products?id=5
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Status Codes:**
- `200` - Product deleted
- `401` - Unauthorized
- `404` - Product not found

---

## Categories Endpoints

### Get All Categories
```
GET /admin/categories
```

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "id": 1,
      "name": "Helmets",
      "slug": "helmets",
      "createdAt": "2024-01-01T00:00:00Z",
      "_count": {
        "products": 5
      }
    }
  ]
}
```

---

### Create Category
```
POST /admin/categories
```

**Request Body:**
```json
{
  "name": "Accessories"
}
```

**Response:**
```json
{
  "success": true,
  "category": {
    "id": 2,
    "name": "Accessories",
    "slug": "accessories",
    "_count": { "products": 0 }
  }
}
```

---

### Update Category
```
PUT /admin/categories
```

**Request Body:**
```json
{
  "id": 2,
  "name": "Updated Category Name"
}
```

**Response:**
```json
{
  "success": true,
  "category": {
    "id": 2,
    "name": "Updated Category Name",
    "slug": "updated-category-name",
    "_count": { "products": 5 }
  }
}
```

---

### Delete Category
```
DELETE /admin/categories?id=2
```

**Note:** Cannot delete categories with products.

**Response:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

## Stockists Endpoints

### Get All Stockists
```
GET /admin/stockists
```

**Response:**
```json
{
  "success": true,
  "stockists": [
    {
      "id": "1705310400000",
      "name": "ABC Sports",
      "country": "India",
      "address": "123 Main St, Mumbai",
      "phone": "+91 9876543210",
      "email": "contact@abc.com",
      "website": "https://abcsports.com"
    }
  ]
}
```

---

### Add Stockist
```
POST /admin/stockists
```

**Request Body:**
```json
{
  "name": "Sports Hub",
  "country": "UK",
  "address": "456 Oxford St, London",
  "phone": "+44 20 1234 5678",
  "email": "contact@hub.com",
  "website": "https://sportshub.com"
}
```

**Response:**
```json
{
  "success": true,
  "stockist": {
    "id": "1705310400001",
    "name": "Sports Hub",
    "country": "UK",
    ...
  }
}
```

---

### Update Stockist
```
PUT /admin/stockists
```

**Request Body:**
```json
{
  "id": "1705310400001",
  "name": "Updated Sports Hub",
  "phone": "+44 20 9999 9999"
}
```

**Response:**
```json
{
  "success": true,
  "stockist": { ... }
}
```

---

### Delete Stockist
```
DELETE /admin/stockists?id=1705310400001
```

**Response:**
```json
{
  "success": true,
  "message": "Stockist deleted successfully"
}
```

---

## Settings Endpoints

### Get Settings
```
GET /admin/settings
```

**Response:**
```json
{
  "success": true,
  "settings": {
    "id": 1,
    "logoPath": "/assets/img/logo/logo-white-2.png",
    "siteEmail": "contact@knyxsports.com",
    "sitePhone": "+44 20 1234 5678",
    "instagramUrl": "https://instagram.com/knyxsports",
    "facebookUrl": "https://facebook.com/knyxsports",
    "twitterUrl": "https://twitter.com/knyxsports",
    "linkedinUrl": "https://linkedin.com/company/knyxsports",
    "stockists": []
  }
}
```

---

### Update Settings
```
POST /admin/settings
```

**Request Body:**
```json
{
  "logoPath": "/assets/img/logo/new-logo.png",
  "siteEmail": "newemail@knyxsports.com",
  "sitePhone": "+44 20 9999 9999",
  "instagramUrl": "https://instagram.com/newprofile"
}
```

**Response:**
```json
{
  "success": true,
  "settings": { ... }
}
```

---

## Admin Profile Endpoints

### Get Current User Profile
```
GET /admin/profile
```

**Response:**
```json
{
  "success": true,
  "user": {
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### Update User Profile
```
POST /admin/profile
```

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

---

## Dashboard Endpoints

### Get Statistics
```
GET /admin/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "products": 15,
    "categories": 3,
    "admins": 2
  },
  "recentActivity": [
    {
      "name": "Product 1",
      "slug": "product-1",
      "createdAt": "2024-01-20T15:30:00Z"
    }
  ]
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (resource doesn't exist)
- `429` - Too Many Requests (rate limited)
- `500` - Server Error

---

## Rate Limiting

Login endpoint is rate limited to **5 attempts per minute** per IP address.

---

## Pagination

Currently, all endpoints return full results. Pagination can be added in future versions.

---

## Sorting

Results are returned in `createdAt DESC` order (newest first) by default.

---

## Filtering

Use query parameters for filtering:

```
GET /admin/products?category=1&status=active
```

Custom filtering can be added to each endpoint as needed.

---

## CORS Policy

Admin API is accessible only from the same origin. CORS is not enabled for security.

---

## Request/Response Headers

**Required Headers:**
```
Content-Type: application/json
```

**Automatic Headers:**
```
Cookie: token=<JWT_TOKEN>
```

The token cookie is set automatically after login and included in all subsequent requests.
