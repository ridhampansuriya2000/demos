import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (currentUser === null) {
      const unsub = onAuthStateChanged(auth, async (user: any) => {
        if(user){
          const res= await getDoc(doc(db, "users", user.uid))
          setCurrentUser(res.data());
        }
      });

      return () => {
        unsub();
      };

    }
  }, [!currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
