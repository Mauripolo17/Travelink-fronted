// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyBYw5usV9U9nRP2kD-YIonHPZWL4ur7Jbk",
  authDomain: "travelink-16032.firebaseapp.com",
  projectId: "travelink-16032",
  storageBucket: "travelink-16032.firebasestorage.app",
  messagingSenderId: "575064351754",
  appId: "1:575064351754:web:8309852e3abdec716a2bf3"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
