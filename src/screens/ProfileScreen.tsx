import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../context/AuthProvider';
import UserInformation from '../components/Profile/UserInformation';
import Allergents from '../components/Profile/Allergents';

const ProfileScreen = () => {
  const [logged, setLogged] = useState(false)

  const { logout } = useContext(AuthContext)

  auth.onAuthStateChanged(user => {
    if (user) {
       setLogged(true)
    }
  })

  const handleSignOut = () => {
    logout(auth);
    setLogged(false)
  }
  return (
      <LinearGradient colors={['#B4D6D3', '#FFFFFF']}  style={styles.linearGradient}>
        <ScrollView 
        style={{flex: 1, width: '100%'}} 
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        >
          <Image
            style={styles.userImg}
            source={require('../../assets/Vector.png')}
          />

          {logged && (
          <View style={{ width: '100%', paddingHorizontal: 20}}>
            <View>
              <Text style={{textAlign: 'center'}}>Hi {auth.currentUser?.email}</Text>
            </View>

            <UserInformation />

            <Allergents />
            
            <TouchableOpacity
              onPress={handleSignOut}
              style={{backgroundColor: '#99AAAB', borderRadius: 12, marginTop: 20, padding: 10}}
            >
              <Text style={{fontSize: 18, color: '#fff' }}>Log out</Text>
            </TouchableOpacity>        
          </View>
          )}
        </ScrollView>
      </LinearGradient>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  linearGradient: {
    flex: 1,
    width: '100%', 
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImg: {
    height: 150,
    width: 150
  }
});