// lib/auth/cookies.ts
import { cookies } from 'next/headers';

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies(); // ✅ This is synchronous
  cookieStore.set('session', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export  async function removeSessionCookie() {
  const cookieStore = await cookies(); 
  cookieStore.delete('session');
}
