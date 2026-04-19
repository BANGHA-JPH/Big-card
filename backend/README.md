# Zita Vegetables E-Commerce Backend API

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Create .env file**
```bash
cp .env.example .env
```

3. **Fill in environment variables:**
   - Supabase URL and keys
   - JWT secret
   - Database URL
   - CORS origins
   - Other optional configs

4. **Start dev server**
```bash
npm run dev
```

## Database Schema

### Users Table
- id (UUID, primary)
- name (string)
- email (string, unique)
- password (string, hashed)
- phone (string)
- avatar (string, optional)
- role (enum: user, admin)
- is_active (boolean)
- created_at (timestamp)
- updated_at (timestamp)

### Products Table
- id (UUID, primary)
- name (string)
- description (text)
- image (string)
- price (decimal)
- original_price (decimal, optional)
- stock (integer)
- unit (string)
- category_id (UUID, foreign key)
- rating (decimal)
- reviews (integer)
- tags (array)
- is_organic (boolean)
- is_fresh (boolean)
- is_active (boolean)
- created_at (timestamp)
- updated_at (timestamp)

### Orders Table
- id (UUID, primary)
- user_id (UUID, foreign key)
- total_price (decimal)
- status (enum: pending, confirmed, processing, shipped, delivered, cancelled)
- delivery_address_id (UUID, foreign key)
- payment_method (string)
- estimated_delivery (timestamp)
- created_at (timestamp)
- updated_at (timestamp)

### Categories Table
- id (UUID, primary)
- name (string, unique)
- icon (string)
- image (string)
- count (integer)
- created_at (timestamp)

### Carts Table
- id (UUID, primary)
- user_id (UUID, foreign key)
- created_at (timestamp)
- updated_at (timestamp)

### Cart Items Table
- id (UUID, primary)
- cart_id (UUID, foreign key)
- product_id (UUID, foreign key)
- quantity (integer)
- created_at (timestamp)

### Addresses Table
- id (UUID, primary)
- user_id (UUID, foreign key)
- type (enum: home, work, other)
- street (string)
- city (string)
- state (string)
- zip_code (string)
- is_default (boolean)
- created_at (timestamp)

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (auth required)
- `PUT /api/v1/auth/profile` - Update profile (auth required)
- `POST /api/v1/auth/logout` - Logout (auth required)

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:productId` - Get product detail
- `GET /api/v1/products/search?q=query` - Search products
- `GET /api/v1/products/category/:categoryId` - Get products by category
- `POST /api/v1/products` - Create product (admin only)
- `PUT /api/v1/products/:productId` - Update product (admin only)
- `DELETE /api/v1/products/:productId` - Delete product (admin only)

### Cart
- `GET /api/v1/cart` - Get cart (auth required)
- `POST /api/v1/cart/add` - Add to cart (auth required)
- `PUT /api/v1/cart/items/:itemId` - Update cart item (auth required)
- `DELETE /api/v1/cart/items/:itemId` - Remove from cart (auth required)
- `DELETE /api/v1/cart` - Clear cart (auth required)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Run production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
