# NH Highway Delights - Travel Experience Booking Platform

## Overview
A full-stack web application for booking travel experiences built with Next.js frontend and Node.js backend. Users can browse experiences, select dates/times, and complete bookings with encrypted data transmission.

## Tech Stack

### Frontend
- **Next.js 14** with TypeScript
- **React** with functional components and hooks
- **Tailwind CSS** for styling
- **Axios** for API calls
- **CryptoJS** for data encryption
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **ES6 modules** (import/export)
- **CORS** enabled for cross-origin requests

## Project Structure

```
codes/
├── frontend/
│   ├── app/
│   │   ├── api/api.ts              # Centralized API service
│   │   ├── page.tsx                # Home page with experience grid
│   │   ├── [places]/
│   │   │   ├── page.tsx            # Booking page with date/time selection
│   │   │   ├── checkout/page.tsx   # Checkout form and payment
│   │   │   └── confirmed/page.tsx  # Booking confirmation
│   ├── components/
│   │   ├── ExperienceCard.tsx      # Reusable experience card
│   │   ├── Navbar.tsx              # Navigation with search
│   │   ├── LoadingSpinner.tsx      # Loading indicator
│   │   └── types.ts                # TypeScript interfaces
│   └── utils/
│       └── encryption.ts           # Data encryption utilities
└── backend/
    └── src/
        ├── models/
        │   ├── Experience.js       # Experience schema
        │   └── Booking.js          # Booking schema
        ├── controller/
        │   └── bookingController.js # Booking CRUD operations
        ├── routes/
        │   └── bookingRoutes.js    # API endpoints
        └── server.js               # Main server file
```

## Key Features

### 1. Experience Browsing
- Grid layout displaying experience cards
- Search functionality to filter experiences
- Responsive design (1 column mobile, 2 tablet, 4 desktop)
- Loading states while fetching data

### 2. Dynamic Routing
- URL-friendly experience names (spaces converted to hyphens)
- Dynamic pages using Next.js `[places]` folder structure
- Navigation between pages with proper back links

### 3. Booking Flow
- **Step 1**: Select experience, date, and time
- **Step 2**: Fill customer information and review order
- **Step 3**: Confirm booking and receive booking ID
- Real-time price calculations with taxes
- Quantity selection with availability checking

### 4. Data Security
- Query parameters encrypted using AES encryption
- Prevents users from manipulating booking data in URLs
- Secure data transmission between pages

### 5. Inventory Management
- Time slot availability decreases when bookings are confirmed
- Prevents overbooking by checking availability before confirming
- Real-time availability display (e.g., "3 left", "Sold out")

## API Architecture

### Centralized API Service (`app/api/api.ts`)
```typescript
// Experience operations
experienceAPI.getAllExperiences()
experienceAPI.searchByName(name)

// Booking operations  
bookingAPI.createBooking(data)
bookingAPI.getBookingById(id)
```

### Backend Endpoints
- `GET /api/experiences` - Fetch all experiences
- `GET /api/experiences/search?q=name` - Search experiences
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details

## Database Schema

### Experience Model
```javascript
{
  title: String,
  description: String,
  location: String,
  price: Number,
  image_url: String,
  dates: [String],
  times: [{
    time: String,
    available: Number
  }]
}
```

### Booking Model
```javascript
{
  experienceId: ObjectId,
  experienceTitle: String,
  date: String,
  time: String,
  quantity: Number,
  subtotal: Number,
  taxes: Number,
  total: Number,
  customerInfo: {
    fullName: String,
    email: String
  },
  status: String
}
```

## Component Architecture

### Reusable Components
- **ExperienceCard**: Displays experience info with responsive layout
- **Navbar**: Search functionality and navigation
- **LoadingSpinner**: Consistent loading states
- **SummaryRow**: Reusable pricing display component

### Page Components
- **Home Page**: Experience grid with search and filtering
- **Booking Page**: Date/time selection with price calculator
- **Checkout Page**: Customer form with order summary
- **Confirmation Page**: Booking details display

## State Management
- React hooks (`useState`, `useEffect`, `useMemo`)
- Local component state for form data
- URL parameters for data passing between pages
- No external state management library needed

## Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: `sm` (640px), `lg` (1024px), `xl` (1280px)
- Flexible grid layouts and component sizing
- Touch-friendly buttons and interactions

## Security Features
- Input validation on both frontend and backend
- Encrypted query parameters prevent tampering
- CORS configuration for API security
- Error handling with user-friendly messages

## Performance Optimizations
- `useMemo` for expensive calculations
- Image optimization with Next.js Image component
- Efficient re-renders with proper dependency arrays
- Centralized API calls to reduce code duplication

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm start  # Runs on port 5500
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Runs on port 3000
```

### Database
- MongoDB connection required
- Ensure MongoDB is running locally or provide connection string

## Key Technical Decisions

1. **TypeScript**: Provides type safety and better developer experience
2. **Centralized API**: All axios calls in one file for maintainability
3. **Encrypted URLs**: Prevents users from manipulating booking data
4. **Component Composition**: Reusable components for consistent UI
5. **ES6 Modules**: Modern JavaScript syntax throughout backend
6. **Responsive Grid**: Adapts to different screen sizes automatically

This architecture provides a scalable, maintainable, and secure booking platform with excellent user experience across all devices.# highwaydelite
