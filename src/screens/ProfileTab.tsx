import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../context/AuthProvider';
import UserInformation from '../components/Profile/UserInformation';
import Allergens from '../components/Profile/Allergens';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ProfileTab = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const { logout } = useContext(AuthContext)

  const handleSignOut = () => {
    logout(auth);
    navigation.navigate('Home', { screen: 'HomeScreen' });
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

          {auth.currentUser ? (
          <View style={{ width: '100%', paddingHorizontal: 20}}>
            <View>
              <Text style={{textAlign: 'center'}}>Hi {auth.currentUser?.email}</Text>
            </View>

            <UserInformation />

            <Allergens />
            
            <TouchableOpacity
              onPress={handleSignOut}
              style={{backgroundColor: '#99AAAB', borderRadius: 12, marginTop: 20, padding: 10}}
            >
              <Text style={{fontSize: 18, color: '#fff' }}>Log out</Text>
            </TouchableOpacity>        
          </View>
          ): (
            <View>
              <Text>Please log in to see profile section</Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
  )
}

export default ProfileTab

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