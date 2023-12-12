import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getStorage, ref } from "firebase/storage";
function startFirebase(){
  const firebaseConfig = {
  apiKey: "AIzaSyD7HPRwO8_ZasyTPPUbD7Fva7S4Z4-t3tU",
  authDomain: "react-solo-project-2.firebaseapp.com",
  projectId: "react-solo-project-2",
  storageBucket: "react-solo-project-2.appspot.com",
  messagingSenderId: "657021935097",
  appId: "1:657021935097:web:68f0231fad3d895744f128",
  measurementId: "G-RTGJTQK80N"
  };
  const app = initializeApp(firebaseConfig);

  return getDatabase(app);

}


export const storage = getStorage();
export default startFirebase;