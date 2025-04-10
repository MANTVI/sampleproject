
'use server';
import { setSessionCookie ,removeSessionCookie} from "@/lib/auth/cookies";



export async function handleFirebaseLogin(token:string) {
  
  await setSessionCookie(token);              
}
export async function handleLogout() {
    await removeSessionCookie();
  }
