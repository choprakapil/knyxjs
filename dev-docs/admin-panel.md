# Admin Panel Documentation

## Overview

The KNYX Admin Panel is a comprehensive backend management system built with Next.js and Prisma. It provides full CRUD operations for managing products, categories, stockists, and site settings.

## Features

### 1. **Dashboard**
- Real-time statistics (products, categories, admin users)
- Recent activity feed
- Quick overview of platform metrics

### 2. **Products Management**
- Create, read, update, and delete products
- Organize products by categories
- Add product descriptions and specifications (JSON)
- Upload product images via URLs
- Search and filter products

### 3. **Categories Management**
- Create and manage product categories
- View product counts per category
- Prevent deletion of categories with products
- Automatic URL slug generation

### 4. **Stockists Management**
- Manage distribution partners and stockists
- Store contact information (email, phone, address)
- Track stockist locations by country
- Website links for each stockist

### 5. **Site Settings**
- Configure global site branding (logo, email, phone)
- Manage social media links (Instagram, Facebook, Twitter, LinkedIn)
- Update contact information

## Architecture

### API Routes

#### Products (`/api/admin/products`)
- **GET** - Fetch all products with categories
- **POST** - Create a new product (requires auth)
- **PUT** - Update an existing product (requires auth)
- **DELETE** - Remove a product (requires auth)

#### Categories (`/api/admin/categories`)
- **GET** - Fetch all categories
- **POST** - Create a new category (requires auth)
- **PUT** - Update a category (requires auth)
- **DELETE** - Remove a category (requires auth)

#### Stockists (`/api/admin/stockists`)
- **GET** - Fetch all stockists
- **POST** - Add a new stockist (requires auth)
- **PUT** - Update a stockist (requires auth)
- **DELETE** - Remove a stockist (requires auth)

#### Settings (`/api/admin/settings`)
- **GET** - Fetch site settings
- **POST** - Update site settings (requires auth)

#### Authentication
- **POST** `/api/auth/login` - Login with email and password
- **POST** `/api/auth/logout` - Logout (clears token)
- **GET** `/api/admin/profile` - Get current user profile
- **POST** `/api/admin/profile` - Update user profile
- **GET** `/api/admin/stats` - Get dashboard statistics

### Database Models

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}

model Category {
  id        Int       @id @default(autoincrement())
  name      String
  slug      String    @unique
  createdAt DateTime  @default(now())
  products  Product[]
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  slug        String   @unique
  description String   @db.Text
  image       String?
  specs       Json?
  createdAt   DateTime @default(now())
  categoryId  Int
  category    Category @relation(fields: [categoryId], references: [id])
}

model Setting {
  id           Int      @id @default(1)
  logoPath     String?
  siteEmail    String?
  sitePhone    String?
  instagramUrl String?
  facebookUrl  String?
  twitterUrl   String?
  linkedinUrl  String?
  stockists    Json?
}
```

## Authentication

### Login Flow
1. Navigate to `/admin/login`
2. Enter admin email and password
3. Token is set in HTTP-only cookie
4. Redirected to `/admin` dashboard
5. Token automatically validated on all admin routes via middleware

### Token Details
- **Expiration**: 7 days
- **Storage**: HTTP-only secure cookie
- **Algorithm**: JWT (HS256)
- **Payload**: User ID, email, role

## Usage Guide

### Creating a Product
1. Go to Admin → Products
2. Click "Add Product"
3. Enter product name and select category
4. Add description and specifications (JSON format)
5. Provide image URL
6. Click "Create Product"

### Adding a Stockist
1. Go to Admin → Stockists
2. Click "Add Stockist"
3. Enter store name and country (required)
4. Add optional contact details and address
5. Click "Add Stockist"

### Updating Site Settings
1. Go to Admin → Settings
2. Choose a tab (General, Contact Info, Social Media)
3. Update relevant fields
4. Click "Save Settings"

## Security Features

✅ **Authentication Required** - All admin routes protected by middleware
✅ **Token Verification** - JWT tokens verified on every request
✅ **CSRF Protection** - POST requests include token validation
✅ **Rate Limiting** - Login attempts rate-limited to 5 per minute
✅ **HTTP-Only Cookies** - Tokens stored securely, not accessible to JavaScript
✅ **Slug Uniqueness** - Automatic URL slug generation prevents conflicts
✅ **Data Validation** - Required fields validated on API level

## Environment Variables Required

```
DATABASE_URL=mysql://user:password@localhost:3306/knyxdb
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

## Development Setup

```bash
# Install dependencies
npm install

# Setup database
npx prisma migrate dev
npx prisma db seed

# Run development server
npm run dev

# Access admin panel
# https://localhost:3000/admin
```

## Frontend Folder Structure

```
app/admin/
  ├── login/                 # Login page
  │   └── page.jsx
  ├── (dashboard)/           # Protected admin routes
  │   ├── layout.jsx        # Main admin layout with sidebar
  │   ├── page.jsx          # Dashboard
  │   ├── products/
  │   │   └── page.jsx      # Products CRUD
  │   ├── categories/
  │   │   └── page.jsx      # Categories CRUD
  │   ├── stockists/
  │   │   └── page.jsx      # Stockists management
  │   ├── settings/
  │   │   └── page.jsx      # Site settings
  │   └── ...               # Other pages
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* resource data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Common Tasks

### Backup Products
```bash
npx prisma db seed  # Uses seed.js to restore data
```

### Reset Database
```bash
npx prisma migrate reset
```

### Generate Prisma Client
```bash
npx prisma generate
```

## Troubleshooting

### Login Not Working
- Check MySQL connection
- Verify JWT_SECRET environment variable is set
- Clear cookies and try again

### Products Not Loading
- Check API response in network tab
- Verify categories exist
- Check database connection

### Images Not Displaying
- Use absolute URLs for image paths
- Verify image URLs are publicly accessible

## Future Enhancements

- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Image upload to storage
- [ ] Product variants and attributes
- [ ] SEO meta tags management
- [ ] Analytics dashboard
- [ ] Role-based access control (RBAC)
- [ ] Audit logs
- [ ] Backup and restore functionality
