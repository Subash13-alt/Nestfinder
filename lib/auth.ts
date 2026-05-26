// lib/auth.ts - Updated
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import clientPromise from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Get user from request
export async function getUserFromRequest(request: NextRequest): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return verifyToken(token);
  }
  
  const cookieToken = request.cookies.get('auth-token')?.value;
  if (cookieToken) {
    return verifyToken(cookieToken);
  }
  
  return null;
}

// Protect API route (admin only)
export async function requireAdmin(request: NextRequest): Promise<JWTPayload | null> {
  const user = await getUserFromRequest(request);
  if (!user || user.role !== 'admin') {
    return null;
  }
  return user;
}

// Protect API route (any authenticated user)
export async function requireAuth(request: NextRequest): Promise<JWTPayload | null> {
  return await getUserFromRequest(request);
}

// Create default admin user if not exists
export async function ensureAdminUser() {
  try {
    const client = await clientPromise;
    const db = client.db('nestfinder');
    const users = db.collection('users');
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nestfinder.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2024';
    
    const existingAdmin = await users.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await hashPassword(adminPassword);
      await users.insertOne({
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ Admin user created');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}