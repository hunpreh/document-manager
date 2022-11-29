import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASlmY-r03juWu90sjz_tTdpgKY02ZN7gw",
  authDomain: "custom-hooks-hagm.firebaseapp.com",
  databaseURL: "https://custom-hooks-hagm-default-rtdb.firebaseio.com",
  projectId: "custom-hooks-hagm",
  storageBucket: "custom-hooks-hagm.appspot.com",
  messagingSenderId: "294009920476",
  appId: "1:294009920476:web:82a81aba4973d612428d19",
  measurementId: "G-JQ6BZ6YJKD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export async function saveDocument(documentID, version, content) {
  set(ref(db, "documents/" + documentID), {
    version: version,
    content: content,
  })
    .then(() => {
      console.log("Guardado")
    })
    .catch((error) => {
      console.log(error);
    });
}
