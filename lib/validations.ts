// ============================================
// Validation Schemas (Using Zod)
// ============================================

import { z } from 'zod';

// ============================================
// User Validations
// ============================================

export const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// ============================================
// Property Validations
// ============================================

export const propertySchema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description cannot exceed 5000 characters'),
  price: z.number()
    .min(100000, 'Price must be at least ₹1 Lakh')
    .max(1000000000, 'Price cannot exceed ₹100 Crores'),
  location: z.string()
    .min(5, 'Please enter a valid location'),
  address: z.string()
    .min(10, 'Please enter a complete address'),
  pincode: z.string()
    .regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit PIN code'),
  bedrooms: z.number()
    .min(0, 'Bedrooms cannot be negative')
    .max(10, 'Maximum 10 bedrooms'),
  bathrooms: z.number()
    .min(0, 'Bathrooms cannot be negative')
    .max(10, 'Maximum 10 bathrooms'),
  area: z.number()
    .min(200, 'Area must be at least 200 sqft')
    .max(50000, 'Area cannot exceed 50000 sqft'),
  propertyType: z.enum(['apartment', 'house', 'villa', 'plot', 'commercial']),
  furnishing: z.enum(['furnished', 'semi-furnished', 'unfurnished']),
  amenities: z.array(z.string()).min(1, 'Please select at least one amenity'),
  images: z.array(z.string()).min(1, 'Please upload at least one image'),
});

// ============================================
// Booking Validations
// ============================================

export const bookingSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  checkIn: z.date()
    .min(new Date(), 'Check-in date cannot be in the past'),
  checkOut: z.date(),
  guests: z.number()
    .min(1, 'At least 1 guest required')
    .max(20, 'Maximum 20 guests allowed'),
  specialRequests: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

// ============================================
// Search Validations
// ============================================

export const searchSchema = z.object({
  location: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  bedrooms: z.number().min(0).max(10).optional(),
  propertyType: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  sortBy: z.enum(['price_low', 'price_high', 'newest']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
}).refine((data) => {
  if (data.minPrice && data.maxPrice) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: "Min price cannot be greater than max price",
  path: ["minPrice"],
});

// ============================================
// Review Validations
// ============================================

export const reviewSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  rating: z.number()
    .min(1, 'Please select a rating')
    .max(5, 'Rating cannot exceed 5'),
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  comment: z.string()
    .min(20, 'Review must be at least 20 characters')
    .max(1000, 'Review cannot exceed 1000 characters'),
});

// ============================================
// Contact Form Validations
// ============================================

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number')
    .optional(),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject cannot exceed 100 characters'),
  message: z.string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
});

// ============================================
// Type Inference
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

// ============================================
// Validation Helper Functions
// ============================================

export function validateLogin(data: unknown) {
  return loginSchema.safeParse(data);
}

export function validateRegister(data: unknown) {
  return registerSchema.safeParse(data);
}

export function validateProperty(data: unknown) {
  return propertySchema.safeParse(data);
}

export function validateBooking(data: unknown) {
  return bookingSchema.safeParse(data);
}

export function validateSearch(data: unknown) {
  return searchSchema.safeParse(data);
}

export function validateReview(data: unknown) {
  return reviewSchema.safeParse(data);
}

export function validateContact(data: unknown) {
  return contactSchema.safeParse(data);
}

// ============================================
// Format Validation Errors
// ============================================

export function formatValidationError(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.errors.forEach((err) => {
    if (err.path) {
      errors[err.path[0]] = err.message;
    }
  });
  return errors;
}