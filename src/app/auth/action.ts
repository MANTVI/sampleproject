
'use server';
import { setSessionCookie ,removeSessionCookie} from "@/lib/auth/cookies";
import type { User } from 'firebase/auth';

// import type { User } from 'firebase/auth';
export async function handleFirebaseLogin(user: User) {
  const token = await user.getIdToken(); 
  setSessionCookie(token);              
}
export async function handleLogout() {
    removeSessionCookie();
  }
