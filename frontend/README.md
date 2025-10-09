# Frontend Documentation

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── auth/          # NextAuth.js routes
│   │   ├── auth/              # Auth pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── forms/            # Form components
│   │   ├── providers/        # Context providers
│   │   └── ui/               # UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   │   └── api/              # API client
│   ├── store/                # Zustand stores
│   └── types/                # TypeScript types
├── public/                   # Static files
├── .env.example             # Environment variables template
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
npm start
```

## 🔑 Key Features

### 1. Authentication (NextAuth.js)
- OAuth (Google, GitHub, etc.)
- Credentials-based login
- JWT sessions
- Protected routes

### 2. State Management
- **React Query**: Server state & caching
- **Zustand**: Client state (lightweight & simple)

### 3. Forms & Validation
- React Hook Form for performance
- Yup for schema validation
- Type-safe forms

### 4. Styling
- Tailwind CSS utility classes
- Custom color palette
- Responsive design
- Dark mode support

## 📝 Usage Examples

### API Calls with React Query
```tsx
import { useVendors } from '@/hooks/useVendors'

export function VendorList() {
  const { data, isLoading, error } = useVendors()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading vendors</div>
  
  return <div>{/* Render vendors */}</div>
}
```

### Forms with Validation
```tsx
import { VendorForm } from '@/components/forms/VendorForm'
import { useCreateVendor } from '@/hooks/useVendors'

export function AddVendor() {
  const { mutate } = useCreateVendor()
  
  return (
    <VendorForm onSubmit={(data) => mutate(data)} />
  )
}
```

### Protected Routes
```tsx
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ProtectedPage() {
  const { data: session } = useSession()
  
  if (!session) {
    redirect('/auth/signin')
  }
  
  return <div>Protected content</div>
}
```

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and fill in your values:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXTAUTH_SECRET`: Secret for NextAuth
- OAuth credentials

## 📦 Dependencies

### Core
- Next.js 14 (App Router)
- React 18
- TypeScript

### State & Data
- @tanstack/react-query
- Zustand
- Axios

### Forms
- react-hook-form
- @hookform/resolvers
- yup

### Auth
- next-auth

### UI
- Tailwind CSS
- lucide-react (icons)

## 🎨 Styling Guide

Use Tailwind utility classes:
```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Click me
</button>
```

Use the `cn` utility for conditional classes:
```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)} />
```
