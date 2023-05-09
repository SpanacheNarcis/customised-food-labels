import { KeyboardAvoidingView,Keyboard, StyleSheet, Text, TextInput, TouchableOpacity,TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from '../../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthProvider';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const navigation= useNavigation()

  const goToRegistration = () => {
    navigation.navigate("RegisterScreen")
  }

  const backToFirstScreen= () => {
    navigation.navigate("FirstScreen")
  }

  const backToHomeScreen= () => {
    navigation.navigate("HomeScreen")
  }

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);


  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View style={{display: 'flex', flexDirection: 'row', paddingHorizontal: 12, justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={backToFirstScreen} style={{marginRight: 20}}>
                <Text style={styles.backToHomepageText}>← Go to First Screen</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={backToHomeScreen} style={{marginLeft: 20}}>
                <Text style={styles.backToHomepageText}>Go to Home Screen →</Text>
              </TouchableOpacity>

          </View>

        <View>
          <Text style={styles.header}>Login</Text>
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
            onPress={() => login(auth, email, password)}
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
        </ScrollView>
      </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  backToHomepageText: {
    textDecorationLine: 'underline'
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  innerContainer: {
    minWidth: '100%', 
    minHeight: '100%',
    height: '100%',
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#b4d6d399',
    flex: 1
  },
  header: {
    fontSize: 32,
    marginBottom: 64,
    textAlign: 'center',
    marginTop: 24
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
  },
  linearGradient: {
    width: '100%', 
    minHeight: '100%',
    height: '100%',
    paddingTop: 50,
    alignItems: 'center',
    flex: 1
  },
})