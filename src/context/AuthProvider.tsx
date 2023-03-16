import React, {createContext, useState} from 'react';
import { auth, signInWithEmailAndPassword } from '../../firebase'
import { createUserWithEmailAndPassword, db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import { Auth, signOut } from 'firebase/auth';

export const AuthContext = createContext({}); 

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation= useNavigation()

  const register = async (email: string , password: string) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        const userEmail = user.email;
        setUser(userEmail);
        console.log('Registered in with ',user.email)
  
        //Save the user's profile information to the database
        const userDoc = {
          email: email,
          age: null,
          height: null,
          weight: null,
          alergents: [],
        }
  
        setDoc(doc(db, "users", userEmail), userDoc)
        .then(() => {
          console.log("Document successfully written!");
          navigation.navigate("HomeScreen")
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      })
      .catch(error => alert(error.message))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  
  const login = async (auth: Auth, email: string, password: string) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUser(email)
        navigation.navigate("HomeScreen")
      })
      .catch(error => alert(error.message))
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  const logout = async (auth: Auth) => {
    setLoading(true)
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  return (
    <AuthContext.Provider 
      value={{
        loading,
        user,
        setUser,
        register,
        login,
        logout
      }}>
    {children}
    </AuthContext.Provider>
  )
}