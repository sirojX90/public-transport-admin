import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBONOwPPV3RX8B_l6P1WdJNk9cMYoj8WWA",
  authDomain: "public-transport-4b3f5.firebaseapp.com",
  projectId: "public-transport-4b3f5",
  storageBucket: "public-transport-4b3f5.appspot.com",
  messagingSenderId: "62322055810",
  appId: "1:62322055810:web:f0939e0f7991117c9df29b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);