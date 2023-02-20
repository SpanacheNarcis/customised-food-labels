import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import { StatusBar } from 'expo-status-bar';
// import Vouched from '../components/Vouched/Vouched';
import {LinearGradient} from 'expo-linear-gradient';
import ScanButton from '../components/ScanButton/ScanButton';
// import LatestHeroes from '../components/Latest-Heroes/LatestHeroes';
// import Header from '../components/Header/Header'
import { useNavigation } from '@react-navigation/native'

const FirstScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF', '#B4D6D3']}  style={styles.linearGradient}>
      <Image source={require('../../assets/44073.png')} style={styles.image}/>

      <Text style={styles.header}>
        GO for a Healthy Lifestyle 
      </Text>

      <Text style={styles.description}>
        Start by choosing healthier products
      </Text>
      <ScanButton type='openModal'/>
      </LinearGradient>
    <StatusBar style="auto" />
    </View>
  )
}

export default FirstScreen

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
  image: {
    resizeMode: 'contain',
    maxWidth: '100%',
    maxHeight: 350
  },
  header: {
    fontSize: 32,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    marginTop: 64
  }
});