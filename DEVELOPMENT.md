# Development Workflow Guide

## Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Supabase account

### Step 1: Database Setup

1. Go to [Supabase Dashboard](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the schema from `backend/sql/schema.sql`
4. Copy your project URL and API keys:
   - Project URL → `SUPABASE_URL`
   - Anon Public Key → `SUPABASE_ANON_KEY`
   - Service Role Secret → `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create and configure .env file
cp .env.example .env
# Edit .env with your Supabase credentials and JWT secret

# Start development server
npm run dev
```

Backend should run on `http://localhost:3000`

### Step 3: Frontend Setup

```bash
# Install dependencies
npm install

# Create and configure .env file
cp .env.example .env
# Edit .env with your API URL and Supabase credentials

# Start development
npm start

# Choose platform:
# - Press 'a' for Android (requires Android Emulator)
# - Press 'i' for iOS (requires iOS Simulator)
# - Press 'w' for Web
# - Scan QR code with Expo Go app on your phone
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:8081,http://localhost:3000,exp://localhost:8081
```

### Frontend (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Testing API Endpoints

Use Postman or REST Client to test:

### Register
```
POST http://localhost:3000/api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

### Login
```
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Products
```
GET http://localhost:3000/api/v1/products
```

### Add to Cart
```
POST http://localhost:3000/api/v1/cart/add
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "productId": "product-uuid",
  "quantity": 1
}
```

## Common Commands

### Frontend
```bash
npm start              # Start development
npm run android        # Run on Android
npm run ios           # Run on iOS
npm run web           # Run on web
npm test              # Run tests
npm run build         # Build app
```

### Backend
```bash
npm run dev           # Start development
npm run build         # Build TypeScript
npm start             # Run production
npm test              # Run tests
npm run lint          # Run ESLint
npm run format        # Format with Prettier
npm run migration:create  # Create migration
npm run migration:run     # Run migrations
```

## Debugging

### Frontend
- Use Expo DevTools
- Enable Redux DevTools in Zustand
- Check React Native Debugger
- Review browser console

### Backend
- Check server logs in terminal
- Enable debug mode: `DEBUG=* npm run dev`
- Use Postman for API testing
- Check Supabase logs

## Troubleshooting

### Port 3000 already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection fails
1. Check credentials in .env
2. Verify Supabase project is active
3. Check network connectivity
4. Review Supabase dashboard

### Expo app won't connect
```bash
# Clear cache
npm start -- --reset-cache

# Restart Expo
npx expo start -c
```

## Project Structure

```
zita-vegetables/
├── src/                    # Frontend React Native code
├── backend/               # Node.js API server
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
├── DEVELOPMENT.md        # This file
└── package.json          # Root package (if needed)
```

## Next Steps

1. ✅ Set up database schema
2. ✅ Start backend server
3. ✅ Start frontend development
4. ✅ Create test account
5. ⬜ Build screens
6. ⬜ Integrate API calls
7. ⬜ Test on actual devices
8. ⬜ Deploy to production

## Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Node.js Docs](https://nodejs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

## Getting Help

- Check API documentation in `backend/README.md`
- Review screen structure in `src/screens/README.md`
- Check component guide in `src/components/README.md`
- Review database schema in `backend/sql/schema.sql`
