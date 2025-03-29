
import firebaseConfig from "@/configFirebase"
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";





const app = initializeApp(firebaseConfig);


export class AuthService {

  auth;


  constructor() {
    this.auth = getAuth(app);


  }


  async createAccount({ email, password, name }: { email: string; password: string; name?: string }) {
    try {
      let signInCheck = false;
      try {
        await signInWithEmailAndPassword(this.auth, email, password);
        signInCheck = true;
      } catch {
        signInCheck = false;
      }

      if (signInCheck) {
        throw new Error("An account with this email already exists. Please log in instead.");
      }
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: name });
        await this.auth.currentUser?.reload();
      }


      if (userCredential) return await this.login({ email, password });
    } catch (error) {
      // console.error("Error in createAccount:", error);
      throw error;
    }
  }


  async login({ email, password }: { email: string; password: string }) {
    try {


      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  }



  async getCurrentUser() {
    try {

      const user = this.auth.currentUser;

      return user;
    } catch (error) {
      console.error("Error in getCurrentUser:", error);

    }
    return null;
  }



  async logout() {
    try {
      await signOut(this.auth);
      sessionStorage.clear();
      localStorage.clear();
    } catch (error) {
      console.error("Error in logout:", error);
    }
  }

}


const authService = new AuthService();
export default authService;
