import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { notification } from "antd";

const openNotification = (type) => {
  notification[type]({
    message: type === "success" ? "Guardado" : "Error",
    description:
      type === "success"
        ? "Su documento ha sido guardado"
        : "Ocurrio un error inesperado",
  });
};

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

export async function saveDocument(documentID, documentData) {
  set(ref(db, "documents/" + documentID), documentData)
    .then(() => {
      openNotification("success");
    })
    .catch((error) => {
      openNotification("error");
      console.dir(error);
    });
}

export async function getDocument(documentID) {
  const dbRef = ref(db);
  get(child(dbRef, `documents/${documentID}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
