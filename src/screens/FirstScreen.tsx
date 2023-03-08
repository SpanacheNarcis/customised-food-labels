import React, { useCallback, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {LinearGradient} from 'expo-linear-gradient';
import StartButton from '../components/StartButton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const FirstScreen = () => {
  const [fontsLoaded] = useFonts({
    'JosefinSlab-Regular': require('../../assets/fonts/JosefinSlab-Regular.ttf'),
    'JosefinSlab-Medium': require('../../assets/fonts/JosefinSlab-Medium.ttf'),
    'JosefinSlab-SemiBold': require('../../assets/fonts/JosefinSlab-SemiBold.ttf'),
    'JosefinSlab-Bold': require('../../assets/fonts/JosefinSlab-Bold.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF', '#B4D6D3']}  style={styles.linearGradient}>
      <Image source={require('../../assets/44073.png')} style={styles.image}/>

      <Text style={styles.header}>
        Welcome to Healthy Lifestyle
      </Text>

      <Text style={styles.description}>
        This is the right place for you to learn more about the products that you are buying day-by-day.
      </Text>
      
      <StartButton/>
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
    textAlign: 'center',
    fontWeight: "600",
    fontFamily: 'JosefinSlab-Bold'
  },
  description: {
    fontSize: 20,
    width: '100%',
    fontWeight: "300",
    textAlign: 'center',
    marginTop: 48,
    maxWidth: 300,
    fontFamily: 'JosefinSlab-Medium'
  }
});