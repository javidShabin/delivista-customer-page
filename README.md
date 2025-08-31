# 🍽️ Delivista - Food Delivery Platform

A modern, responsive food delivery web application built with React, TypeScript, and Tailwind CSS. Delivista connects users with local restaurants, offering a seamless ordering experience with real-time tracking and secure payment processing.

## ✨ Features

### 🏠 **User Features**
- **Restaurant Discovery**: Browse and search local restaurants
- **Menu Management**: View detailed menus with categories and pricing
- **Shopping Cart**: Add/remove items with real-time updates
- **Order Tracking**: Real-time order status updates
- **User Dashboard**: Profile management, order history, and preferences
- **Address Management**: Multiple delivery addresses with default settings
- **Wishlist**: Save favorite restaurants and dishes

### 🏪 **Restaurant Features**
- **Menu Display**: Beautiful menu presentation with images
- **Category Organization**: Well-structured food categories
- **Pricing Information**: Clear pricing and availability

### 🔐 **Authentication & Security**
- **User Registration/Login**: Secure authentication system
- **Protected Routes**: Role-based access control
- **OTP Verification**: Two-factor authentication
- **Password Management**: Secure password updates

### 💳 **Payment & Orders**
- **Secure Payments**: Integrated payment gateway
- **Order Management**: Complete order lifecycle tracking
- **Order History**: Detailed order records and status

## 🛠️ Technology Stack

### **Frontend**
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Vite 7.0.0** - Fast build tool and dev server

### **State Management**
- **Redux Toolkit 2.8.2** - Modern Redux with simplified syntax
- **React Redux 9.2.0** - React bindings for Redux

### **Routing & Navigation**
- **React Router DOM 7.6.3** - Client-side routing

### **UI/UX Libraries**
- **Framer Motion 12.23.12** - Smooth animations and transitions
- **Lucide React 0.525.0** - Beautiful icon library
- **React Hook Form 7.59.0** - Performant forms with validation
- **React Hot Toast 2.5.2** - Elegant notifications
- **React Spinners 0.17.0** - Loading indicators

### **Data Visualization**
- **Recharts 3.1.2** - Composable charting library

### **HTTP Client**
- **Axios 1.10.0** - Promise-based HTTP client

### **Development Tools**
- **ESLint 9.29.0** - Code linting and formatting
- **TypeScript ESLint 8.34.1** - TypeScript-specific linting rules

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/       # Reusable UI components
│   ├── authUser/    # User-specific components
│   ├── Footer.tsx   # Footer component
│   ├── JoinUs.tsx   # Join us section
│   └── OtpVerify.tsx # OTP verification
├── config/          # Configuration files
│   └── axiosInstance.tsx # Axios configuration
├── context/         # React Context providers
│   └── CartContext.tsx # Shopping cart context
├── layout/          # Layout components
│   ├── DashboardLayout.tsx # User dashboard layout
│   └── UserLayout.tsx # Main app layout
├── pages/           # Page components
│   ├── authUser/    # Authenticated user pages
│   │   ├── Dashboard/ # User dashboard pages
│   │   ├── CartPage.tsx # Shopping cart
│   │   ├── successPage.tsx # Payment success
│   │   └── cancelPage.tsx # Payment failure
│   ├── Home.tsx     # Landing page
│   ├── LoginForm.tsx # User login
│   ├── SignupForm.tsx # User registration
│   ├── Restaurants.tsx # Restaurant listing
│   └── SingleRestaurant.tsx # Individual restaurant
├── redux/           # Redux store and slices
│   ├── features/    # Feature-specific slices
│   │   └── user/    # User state management
│   └── store.ts     # Redux store configuration
├── routes/          # Routing configuration
│   ├── protectedRoutes/ # Protected route components
│   └── router.tsx   # Main router configuration
├── services/        # API service functions
│   ├── addressService.tsx # Address management
│   ├── cartService.tsx # Cart operations
│   ├── menuService.tsx # Menu management
│   ├── orderService.tsx # Order operations
│   └── wishlistService.tsx # Wishlist management
├── types/           # TypeScript type definitions
│   └── Address.ts   # Address interface
├── utils/           # Utility functions
│   └── api.tsx      # API utility functions
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### **Tailwind CSS**
The project uses Tailwind CSS v4 with custom configurations for responsive design and animations.

## 📱 Features Overview

### **Homepage**
- Hero section with animated background elements
- Restaurant showcase with ratings and categories
- Call-to-action sections for user engagement
- Responsive design for all device sizes

### **User Dashboard**
- **Profile Management**: Update personal information
- **Order History**: View and track all orders
- **Address Book**: Manage delivery addresses
- **Favorites**: Save preferred restaurants
- **Settings**: Password and privacy preferences

### **Restaurant Experience**
- Browse restaurants by category
- View detailed menus with images
- Add items to cart with quantity selection
- Real-time price calculations

### **Shopping Cart**
- Add/remove items
- Quantity adjustments
- Price calculations
- Secure checkout process

## 🎨 Design System

### **Color Palette**
- Primary: Orange/Yellow tones for food theme
- Secondary: Green accents for freshness
- Neutral: Clean whites and grays
- Accent: Vibrant colors for highlights

### **Typography**
- Modern, readable font stack
- Consistent heading hierarchy
- Responsive text sizing

### **Animations**
- Smooth page transitions
- Hover effects and micro-interactions
- Loading states and feedback
- Floating decorative elements

## 🔒 Security Features

- Protected routes for authenticated users
- Secure API communication
- Input validation and sanitization
- Session management
- OTP verification for critical actions

## 📊 Performance

- Lazy loading for route components
- Optimized image assets
- Efficient state management
- Fast build times with Vite
- Responsive design for all devices

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

### **Manual Deployment**
1. Build the project: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time Chat**: Customer support integration
- **Push Notifications**: Order updates and promotions
- **Analytics Dashboard**: Restaurant performance metrics
- **Multi-language Support**: Internationalization
- **Dark Mode**: Theme customization
- **Mobile App**: React Native companion app

---

**Built with ❤️ using modern web technologies**
