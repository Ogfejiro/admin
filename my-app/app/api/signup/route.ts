"use-client"

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs'; // Make sure to install bcryptjs: npm install bcryptjs

// In a real app, you would import your database client
// import { db } from '@/lib/db'; 

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    // const existingUser = await db.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    // }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to your database
    // await db.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //   },
    // });

    // Set a session cookie and return success
    const sessionToken = 'your-secure-session-token-here'; // Replace with a real token
    cookies().set('auth_token', sessionToken, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}