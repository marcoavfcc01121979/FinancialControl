import React, {useState, createContext, useEffect} from 'react';
import firebase from '../services/firebaseConnections';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async () => {
      const storageUser = await AsyncStorage.getItem('Auth_user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    };
    loadStorage();
  }, []);

  //funcao para logar o usuario
  const signIn = async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firebase
          .database()
          .ref('users')
          .child(uid)
          .once('value')
          .then(snapshot => {
            let data = {
              uid: uid,
              nome: snapshot.val().nome,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          });
      })
      .catch(error => {
        alert(error.code);
      });
  };

  //Cadastrar usuario
  async function signUp(email, password, nome) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firebase
          .database()
          .ref('users')
          .child(uid)
          .set({
            saldo: 0,
            nome: nome,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          });
      })
      .catch(error => {
        alert(error.code);
      });
  }

  const storageUser = async data => {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signUp, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
