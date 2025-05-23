import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { firebaseCofigProtected } from "../Config/config.js";

const firebaseConfig = {
  ...firebaseCofigProtected,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export {
  app,
  setDoc,
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  doc,
};
