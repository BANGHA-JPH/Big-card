# Zita Vegetables E-Commerce Mobile Application

A full-stack React Native e-commerce application for selling fresh vegetables with Expo, Node.js backend, and Supabase PostgreSQL database.

## Project Structure

```
zita-vegetables/
├── frontend/                 # React Native with Expo
│   ├── src/
│   │   ├── screens/         # App screens
│   │   ├── components/      # Reusable components
│   │   ├── navigation/      # Navigation setup
│   │   ├── services/        # API and Supabase services
│   │   ├── store/           # Zustand state management
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Helper utilities
│   │   ├── constants/       # App constants
│   │   ├── styles/          # Theme and styles
│   │   ├── assets/          # Images, fonts
│   │   └── types/           # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── app.json             # Expo configuration
│   ├── package.json         # Dependencies
│   └── tsconfig.json        # TypeScript config
│
└── backend/                  # Node.js Express Server
    ├── src/
    │   ├── config/          # Configuration files
    │   ├── controllers/      # Request handlers
    │   ├── middleware/       # Express middleware
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic
    │   ├── validators/      # Input validation
    │   ├── utils/           # Helper utilities
    │   ├── models/          # Data models
    │   ├── migrations/      # Database migrations
    │   └── server.ts        # Main server file
    ├── sql/
    │   └── schema.sql       # Database schema
    ├── package.json         # Dependencies
    ├── tsconfig.json        # TypeScript config
    └── README.md            # Backend documentation

```

## Technology Stack

### Frontend
- **React Native** - Mobile framework
- **Expo** - Development tools
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Navigation** - Navigation
- **Axios** - HTTP client
- **Supabase** - Backend services

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Supabase** - PostgreSQL database
- **JWT** - Authentication
- **Joi** - Validation

### Database
- **PostgreSQL** - Relational database (via Supabase)
- **Supabase** - Backend-as-a-Service

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Supabase account

### Frontend Setup

```bash
cd zita-vegetables

# Install dependencies
npm install

# Create .env file (if needed)
cp .env.example .env

# Update your API and Supabase configuration in src/constants/index.ts

# Start development server
npm start

# For Android
npm run android

# For iOS
npm run ios

# For web
npm run web
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Fill in your Supabase credentials:
# SUPABASE_URL=your_url
# SUPABASE_ANON_KEY=your_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# JWT_SECRET=your_secret_key

# Start dev server
npm run dev

# Build for production
npm run build
npm start
```

### Database Setup

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy your project URL and API keys
4. Run the SQL schema in `backend/sql/schema.sql` in Supabase SQL editor
5. Update environment variables with your credentials

## Features

### User Features
- User authentication (register, login, logout)
- Profile management
- Browse products
- Search and filter vegetables
- Add to cart and checkout
- Order history and tracking
- Favorites/Wishlist
- Address management
- Product reviews and ratings
- Coupon application

### Admin Features
- Product management (CRUD)
- Order management
- User management
- Analytics and reports
- Inventory management

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/profile` - Update profile
- `POST /api/v1/auth/logout` - Logout

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product details
- `GET /api/v1/products/search?q=query` - Search products
- `GET /api/v1/products/category/:categoryId` - Get products by category

### Cart
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/add` - Add to cart
- `PUT /api/v1/cart/items/:itemId` - Update cart item
- `DELETE /api/v1/cart/items/:itemId` - Remove from cart
- `DELETE /api/v1/cart` - Clear cart

## Environment Variables

### Frontend (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Backend (.env)
```
NODE_ENV=development
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_secret
```

## Development Workflow

1. Start backend server: `cd backend && npm run dev`
2. Start frontend development: `npm start`
3. Use Expo Go app to test on mobile
4. Make changes and test across devices

## Database Schema

See `backend/sql/schema.sql` for complete database structure

### Main Tables
- **users** - User accounts
- **products** - Product catalog
- **categories** - Product categories
- **carts** - Shopping carts
- **cart_items** - Cart items
- **orders** - Customer orders
- **order_items** - Order items
- **addresses** - Delivery addresses
- **reviews** - Product reviews
- **coupons** - Discount coupons

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation with Joi
- Helmet for HTTP headers
- Rate limiting
- Secure Supabase RLS policies

## Performance Optimization

- Pagination for large datasets
- Image optimization
- Lazy loading
- State management with Zustand
- Code splitting
- API caching strategies

## Testing

```bash
# Frontend tests
npm test

# Backend tests
cd backend && npm test
```

## Deployment

### Frontend
```bash
npm run build
# Deploy to Expo
eas build
eas submit
```

### Backend
```bash
npm run build
# Deploy to platforms like Heroku, Railway, Render
```

## Troubleshooting

### Port already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Clear cache
```bash
# React Native
npm start -- --reset-cache

# npm cache
npm cache clean --force
```

### Database connection issues
- Verify Supabase credentials
- Check network connectivity
- Review Supabase dashboard for errors

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## License

MIT License

## Support

For issues and questions:
1. Check existing documentation
2. Review API documentation
3. Check Supabase documentation
4. Open an issue on GitHub

## Future Enhancements

- Real-time notifications
- Mobile wallet integration
- Advanced analytics
- Recommendation engine
- Multi-language support
- Offline support
- Payment gateway integration
- Admin dashboard web app
