import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from '../../firebase';


const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation= useNavigation()

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user
      console.log('Registered in with ',user.email)
    })
    .catch(error => alert(error.message))
  }

  const backToLogin = () => {
    navigation.navigate("LoginScreen")
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <TouchableOpacity onPress={backToLogin} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>←back to login</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.header}>Create an account!</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Email'
            value= {email}
            onChangeText= {text => setEmail(text)}
            style={styles.input}
          />
          <TextInput 
            placeholder='Password'
            value= {password}
            onChangeText= {text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  backToLogin: {
    position: 'absolute',
    top: 64,
    left: 32,
  },
  backToLoginText: {
    textDecorationLine: 'underline'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 48,
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
    width: '60%',
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
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#287AAE',
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonOutlineText: {
    color: '#287AAE',
    fontWeight: '700',
    fontSize: 16
  },
})