import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,Keyboard, TouchableWithoutFeedback, View, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthProvider';



const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation= useNavigation()

  const authContext = useContext(AuthContext);
  const { register, loading} = authContext;

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
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <TouchableOpacity onPress={backToLogin} >
            <Text style={styles.backToLoginText}>←back to login</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.header}>Register</Text>
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
              onPress={() => register(email, password)}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
          
          {loading && (
            <View style={{width: 200, height: 200, backgroundColor: 'red'}}>
              <Text>We are creating an account for you</Text>
            </View>
          )}
        </ScrollView>
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
    marginHorizontal: 'auto'
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