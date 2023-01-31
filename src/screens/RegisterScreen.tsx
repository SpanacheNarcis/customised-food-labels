import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import { StatusBar } from 'expo-status-bar';
// import Vouched from '../components/Vouched/Vouched';
import {LinearGradient} from 'expo-linear-gradient';
import ScanButton from '../components/ScanButton/ScanButton';
// import LatestHeroes from '../components/Latest-Heroes/LatestHeroes';
// import Header from '../components/Header/Header'
import { useNavigation } from '@react-navigation/native'

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF', '#B4D6D3']}  style={styles.linearGradient}>
      </LinearGradient>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    width: '100%', 
    paddingTop: 50,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'flex-start',
  },
});