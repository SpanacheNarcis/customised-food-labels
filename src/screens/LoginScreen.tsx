import { KeyboardAvoidingView,Keyboard, StyleSheet, Text, TextInput, TouchableOpacity,TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from '../../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation= useNavigation()
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("HomeScreen")
      }
    })

    return unsubscribe
  }, [])

  const goToRegistration = () => {
    navigation.navigate("RegisterScreen")
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with ', user.email)
    })
    .catch(error => alert(error.message))
  }

  const backToHomepage = () => {
    navigation.navigate("Home")
  }

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <TouchableOpacity onPress={backToHomepage} style={styles.backToHomepage}>
          <Text style={styles.backToHomepageText}>←back to homepage</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.header}>Please enter your email and password to</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Email'
            value= {email}
            onChangeText= {text => setEmail(text)}
            onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
          />
          <TextInput 
            placeholder='Password'
            value= {password}
            onChangeText= {text => setPassword(text)}
            onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.viewRegister}>
            <Text style={styles.buttonOutlineText}>Don't you have an account already? 
              <View>
              <TouchableOpacity
                onPress={goToRegistration}
                style={styles.signUpTouchable}
                > 
                <Text style={styles.signUp}> Sign-up</Text>
              </TouchableOpacity>
              </View>

            </Text>
          </View>

        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  backToHomepage: {
    position: 'absolute',
    top: 64,
    left: 32,
  },
  backToHomepageText: {
    textDecorationLine: 'underline'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 32,
    marginBottom: 64,
    textAlign: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 16,
    marginTop: 5,
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#287AAE',
    width: '100%',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  viewRegister: {
  },
  buttonOutlineText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  signUpTouchable: {
  },
  signUp: {
    color: '#287AAE',
    fontSize: 12,
    marginTop: 20,
    marginBottom: -3,
  }
})