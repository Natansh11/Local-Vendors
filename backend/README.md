# Backend Documentation

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── guards/           # Auth guards
│   │   ├── strategies/       # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/                # Users module
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── vendors/              # Vendors module
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── vendors.controller.ts
│   │   ├── vendors.service.ts
│   │   └── vendors.module.ts
│   ├── app.module.ts         # Root module
│   └── main.ts               # Application entry point
├── test/                     # E2E tests
├── .env.example             # Environment variables template
├── nest-cli.json            # Nest CLI configuration
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Setup Environment
Copy `.env.example` to `.env` and configure:
```bash
DATABASE_URL=mongodb://localhost:27017/sahakarita
JWT_SECRET=your-secret-key
PORT=3001
```

### Development
```bash
npm run start:dev
```

### Production Build
```bash
npm run build
npm run start:prod
```

## 📝 API Documentation

API documentation is available via Swagger UI:
```
http://localhost:3001/api/docs
```

## 🔐 Authentication

### Register
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

## 🔑 Protected Routes

Add the JWT token to Authorization header:
```
Authorization: Bearer <token>
```

## 📦 Modules

### Auth Module
- JWT authentication
- Local strategy
- Password hashing with bcrypt
- Token generation

### Users Module
- User management
- Profile operations
- User listing (protected)

### Vendors Module
- CRUD operations for vendors
- All endpoints protected with JWT
- MongoDB schema with timestamps

## 🗄️ Database

### MongoDB (Default)
```javascript
// Connection in app.module.ts
MongooseModule.forRoot(process.env.DATABASE_URL)
```

### PostgreSQL (Alternative with Prisma)
1. Install Prisma:
```bash
npm install @prisma/client
npm install -D prisma
```

2. Initialize Prisma:
```bash
npx prisma init
```

3. Update schema in `prisma/schema.prisma`
4. Run migrations:
```bash
npx prisma migrate dev
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📋 Available Scripts

- `npm run start` - Start application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Key Features

### Validation
- Class-validator for DTO validation
- Automatic validation pipe
- Type-safe requests

### Security
- JWT authentication
- Password hashing
- CORS enabled
- Helmet for security headers (add if needed)

### Documentation
- Swagger/OpenAPI
- Auto-generated API docs
- DTO documentation with decorators

## 🎯 Next Steps

1. **Add Prisma for PostgreSQL** (optional):
   - Replace Mongoose with Prisma
   - Better type safety
   - Migrations support

2. **Add more modules**:
   - Payments
   - Notifications
   - File uploads

3. **Add microservices** (optional):
   - NestJS microservices
   - Message queues
   - Event-driven architecture

4. **Add caching**:
   - Redis integration
   - Cache manager

5. **Add rate limiting**:
   - @nestjs/throttler

## 🔗 Useful Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Passport.js Documentation](http://www.passportjs.org)
