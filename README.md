# Zita - Fresh Vegetables E-commerce Platform

A full-stack e-commerce application for selling fresh vegetables, built with React Native and Node.js.

## Project Structure

```
Big-card/
|
|-- mobile/                 # React Native mobile app
|   |-- src/
|   |   |-- components/
|   |   |-- screens/
|   |   |-- navigation/
|   |   |-- services/
|   |   |-- store/
|   |   |-- hooks/
|   |   |-- utils/
|   |   |-- types/
|   |   |-- constants/
|   |   |-- styles/
|   |-- App.tsx
|   |-- package.json
|   |-- app.json
|   |-- tsconfig.json
|   |-- babel.config.js
|   |-- .env.example
|
|-- backend/                # Node.js API server
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- routes/
|   |   |-- middleware/
|   |   |-- services/
|   |   |-- utils/
|   |   |-- validators/
|   |-- package.json
|   |-- tsconfig.json
|   |-- .env.example
|
|-- docs/                   # Documentation
|   |-- README.md
|   |-- DEVELOPMENT.md
|   |-- SETUP_SUMMARY.md
|
|-- assets/                 # Design files and images
|   |-- Designs/
|
|-- config/                 # Shared configuration
|   |-- .gitignore
|   |-- .eslintrc.js
|   |-- .prettierrc
|   |-- babel.config.js
|
|-- package.json           # Root package.json (monorepo)
|-- tsconfig.json          # Root TypeScript config
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BANGHA-JPH/Big-card.git
   cd Big-card
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   - Copy `mobile/.env.example` to `mobile/.env`
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your actual values

### Running the Application

#### Option 1: Run both services simultaneously
```bash
npm start
```

#### Option 2: Run services separately
```bash
# Terminal 1 - Backend
npm run start:backend

# Terminal 2 - Mobile
npm run start:mobile
```

#### Option 3: Run individual services
```bash
# Backend only
cd backend && npm run dev

# Mobile only
cd mobile && npm start
```

## Development

### Scripts

- `npm run start` - Start both backend and mobile concurrently
- `npm run start:backend` - Start backend server only
- `npm run start:mobile` - Start mobile app only
- `npm run build:mobile` - Build mobile app
- `npm run build:backend` - Build backend for production
- `npm run test` - Run tests for all packages
- `npm run lint` - Run linting for all packages

### Environment Variables

#### Mobile App (mobile/.env)
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

#### Backend (backend/.env)
```
NODE_ENV=development
PORT=3000
SERVER_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
JWT_SECRET=your_jwt_secret_key_here_min_32_characters
CORS_ORIGIN=http://localhost:8081,exp://localhost:8081
```

## Features

### Mobile App
- User authentication (login, register, password reset)
- Product browsing and search
- Shopping cart management
- Order placement and tracking
- User profile management
- Address management
- Favorites/wishlist
- Real-time notifications

### Backend API
- RESTful API architecture
- JWT authentication
- Supabase database integration
- File upload support
- Rate limiting and security
- Comprehensive error handling
- API documentation

## Technology Stack

### Mobile App
- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Zustand** for state management
- **Axios** for API calls
- **React Native Toast Notifications**

### Backend
- **Node.js** with Express
- **TypeScript**
- **Supabase** for database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Joi** for validation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Happy Coding!**
