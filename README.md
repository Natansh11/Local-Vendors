# Local-Vendors - Modern Full-Stack Application

A modern full-stack application built with Next.js, NestJS, and MongoDB/PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Query + Zustand
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Yup
- **TypeScript**: Full type safety

### Backend
- **Framework**: NestJS
- **Database**: MongoDB (Atlas) / PostgreSQL with Prisma
- **Authentication**: JWT + OAuth strategies
- **Validation**: Class-validator
- **TypeScript**: Full type safety

## 📁 Project Structure

```
sahakarita/
├── frontend/          # Next.js application
├── backend/           # NestJS API
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm
- MongoDB Atlas account OR PostgreSQL

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access at: http://localhost:3000

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
API at: http://localhost:3001

## 📦 Features

- ✅ Server-Side Rendering (SSR) & Static Generation (SSG)
- ✅ RESTful API with NestJS
- ✅ MongoDB/PostgreSQL database support
- ✅ JWT & OAuth authentication
- ✅ Form validation
- ✅ Type-safe development
- ✅ Modular architecture
- ✅ Ready for PWA
- ✅ Microservices ready

## 🔐 Environment Variables

See `.env.example` files in both frontend and backend directories.

## 📄 License

MIT
