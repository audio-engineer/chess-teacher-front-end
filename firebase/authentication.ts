import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import type { User } from "firebase/auth";

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

auth.onAuthStateChanged(() => {
  const user = getCurrentUser();
  if (user) {
    console.log("User is logged in");
  } else {
    console.log("User is logged out");
  }
});

export async function signInWithGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();
  await setPersistence(auth, browserLocalPersistence);
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("credential: ", credential);
  } catch (error) {
    console.error("An error occurred with pop up when signing in:", error);
  }
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function checkAuth(): boolean {
  const user = getCurrentUser();
  return !!user;
}
