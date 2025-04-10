
'use server';
import { setSessionCookie ,removeSessionCookie} from "@/lib/auth/cookies";

export async function handleFirebaseLogin(user: any) {
  const token = await user.getIdToken(); 
  setSessionCookie(token);              
}
export async function handleLogout() {
    removeSessionCookie();
  }
