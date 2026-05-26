// ============================================
// App Configuration
// ============================================

export const APP_NAME = 'NestFinder';
export const APP_TAGLINE = 'Find Your Perfect Nest';
export const APP_DESCRIPTION = 'India\'s most trusted property discovery platform';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ============================================
// Property Constants
// ============================================

export const PROPERTY_TYPES = {
  APARTMENT: 'apartment',
  HOUSE: 'house',
  VILLA: 'villa',
  PLOT: 'plot',
  COMMERCIAL: 'commercial',
} as const;

export const PROPERTY_TYPES_LABEL: Record<string, string> = {
  [PROPERTY_TYPES.APARTMENT]: 'Apartment',
  [PROPERTY_TYPES.HOUSE]: 'Independent House',
  [PROPERTY_TYPES.VILLA]: 'Villa',
  [PROPERTY_TYPES.PLOT]: 'Plot/Land',
  [PROPERTY_TYPES.COMMERCIAL]: 'Commercial Space',
};

export const BHK_OPTIONS = [
  { value: '1', label: '1 BHK' },
  { value: '2', label: '2 BHK' },
  { value: '3', label: '3 BHK' },
  { value: '4', label: '4 BHK' },
  { value: '4+', label: '4+ BHK' },
];

export const FURNISHING_STATUS = {
  FURNISHED: 'furnished',
  SEMI_FURNISHED: 'semi-furnished',
  UNFURNISHED: 'unfurnished',
} as const;

export const FURNISHING_LABEL: Record<string, string> = {
  [FURNISHING_STATUS.FURNISHED]: 'Fully Furnished',
  [FURNISHING_STATUS.SEMI_FURNISHED]: 'Semi-Furnished',
  [FURNISHING_STATUS.UNFURNISHED]: 'Unfurnished',
};

// ============================================
// Amenities List
// ============================================

export const AMENITIES = [
  { id: 'parking', label: 'Parking', icon: '🚗' },
  { id: 'security', label: '24x7 Security', icon: '🔒' },
  { id: 'lift', label: 'Lift', icon: '🛗' },
  { id: 'gym', label: 'Gym', icon: '💪' },
  { id: 'swimming-pool', label: 'Swimming Pool', icon: '🏊' },
  { id: 'clubhouse', label: 'Clubhouse', icon: '🏠' },
  { id: 'garden', label: 'Garden', icon: '🌿' },
  { id: 'children-play-area', label: 'Children\'s Play Area', icon: '🎠' },
  { id: 'power-backup', label: 'Power Backup', icon: '⚡' },
  { id: 'water-storage', label: 'Water Storage', icon: '💧' },
  { id: 'waste-disposal', label: 'Waste Disposal', icon: '🗑️' },
  { id: 'fire-safety', label: 'Fire Safety', icon: '🔥' },
  { id: 'intercom', label: 'Intercom', icon: '📞' },
  { id: 'vaastu', label: 'Vaastu Compliant', icon: '🕉️' },
] as const;

// ============================================
// Price Ranges (in INR)
// ============================================

export const PRICE_RANGES = [
  { min: 0, max: 5000000, label: 'Under ₹50 Lakhs' },
  { min: 5000000, max: 10000000, label: '₹50 Lakhs - ₹1 Cr' },
  { min: 10000000, max: 20000000, label: '₹1 Cr - ₹2 Cr' },
  { min: 20000000, max: 50000000, label: '₹2 Cr - ₹5 Cr' },
  { min: 50000000, max: null, label: 'Above ₹5 Cr' },
];

// ============================================
// Booking Status
// ============================================

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  [BOOKING_STATUS.PENDING]: 'Pending',
  [BOOKING_STATUS.CONFIRMED]: 'Confirmed',
  [BOOKING_STATUS.CANCELLED]: 'Cancelled',
  [BOOKING_STATUS.COMPLETED]: 'Completed',
};

export const BOOKING_STATUS_COLOR: Record<string, string> = {
  [BOOKING_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [BOOKING_STATUS.CONFIRMED]: 'bg-green-100 text-green-800',
  [BOOKING_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
  [BOOKING_STATUS.COMPLETED]: 'bg-blue-100 text-blue-800',
};

// ============================================
// API Endpoints
// ============================================

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  
  // Properties
  PROPERTIES: '/api/properties',
  PROPERTY_DETAIL: (id: string) => `/api/properties/${id}`,
  
  // Bookings
  BOOKINGS: '/api/bookings',
  BOOKING_DETAIL: (id: string) => `/api/bookings/${id}`,
  CANCEL_BOOKING: (id: string) => `/api/bookings/${id}/cancel`,
  CONFIRM_BOOKING: (id: string) => `/api/bookings/${id}/confirm`,
  
  // Favourites
  FAVOURITES: '/api/favourite',
  
  // Search & Filters
  SEARCH: '/api/search',
  
  // Chatbot
  CHATBOT: '/api/chatbot',
  
  // Admin
  ADMIN_STATS: '/api/admin/stats',
  VERIFY_LISTING: '/api/admin/verify-listing',
  REJECT_LISTING: '/api/admin/reject-listing',
} as const;

// ============================================
// Pagination
// ============================================

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// ============================================
// Local Storage Keys
// ============================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER: 'user',
  THEME: 'theme',
  FILTERS: 'saved-filters',
  RECENT_SEARCHES: 'recent-searches',
} as const;

// ============================================
// Theme
// ============================================

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// ============================================
// Routes
// ============================================

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  LISTINGS: '/listings',
  FAVOURITES: '/favourites',
  BOOKINGS: '/bookings',
  ONBOARDING: '/onboarding',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;