import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginRequest, signupRequest } from "../api/authService";
import axios from "axios";
import { clienteService, cliente } from "../api/clienteService";
import firebaseApp from "../firebase/credenciales.tsx";

import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import { log } from "console";
const auth = getAuth(firebaseApp);


interface AuthContextType {
  login: (loginReques: loginRequest) => void;
  signup: (signupRequest: signupRequest) => void;
  // isAuthenticated: boolean;
  logout: () => void;
  token: string | null;
  user: cliente | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const firestore = getFirestore(firebaseApp);
  const [user, setUser] = useState<cliente | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function getInfoUser(uid: any) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data();
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase: any) {
    getInfoUser(usuarioFirebase.uid).then((user: any) => {
      const userData = {
        id: usuarioFirebase.uid,
        username: user.username,
        email: usuarioFirebase.email,
        password: user.password,
        nombre: user.nombre,
        apellido: user.apellido,
        numeroDocumento: user.numeroDeDocumento,
        direccion: user.Adress,
        telefono: user.telefono,
        fechaDeNacimiento: user.fechaNacimient
      };
      setUser(userData);
      setIsAuthenticated(1);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {

    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (loginRequest: loginRequest) => {
    try {
      signInWithEmailAndPassword(auth, loginRequest.username, loginRequest.password);

    } catch (error: any) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data?.message || error.message
      );
    }
  };

  const signup = async (signupRequest: signupRequest) => {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      signupRequest.email,
      signupRequest.password
    ).then((usuarioFirebase) => {
      getInfoUser(usuarioFirebase.user.uid).then((user: any) => {
        const userData = {
          id: usuarioFirebase.user.uid,
          username: user.username,
          email: usuarioFirebase.user.email,
          password: user.password,
          nombre: user.nombre,
          apellido: user.apellido,
          numeroDocumento: user.numeroDeDocumento,
          direccion: user.Adress,
          telefono: user.telefono,
          fechaDeNacimiento: user.fechaNacimient
        };
        clienteService.createClient(userData as cliente).then((response) => {;
        });
      });
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef,
      {
        username: signupRequest.email,
        email: signupRequest.email,
        password: signupRequest.password,
        nombre: signupRequest.nombre,
        apellido: signupRequest.apellido,
        numeroDocumento: signupRequest.numeroDocumento,
        direccion: signupRequest.direccion,
        telefono: signupRequest.telefono,
        fechaDeNacimiento: signupRequest.fechaDeNacimiento,
      });
  }


  const logout = () => {
     localStorage.setItem("user", JSON.stringify(null));
    signOut(auth)
    setUser(null);
    localStorage.clear();
  };

  // Configurar axios para agregar el token automáticamente en cada petición
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
