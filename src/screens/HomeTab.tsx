import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, SafeAreaView, Platform, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import ScanButton from '../components/ScanButton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomeTab = () => {
  const [inputValue, setInputValue] = React.useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  // const [fontsLoaded] = useFonts({
  //   'JosefinSlab-Regular': require('../../assets/fonts/JosefinSlab-Regular.ttf'),
  //   'JosefinSlab-Medium': require('../../assets/fonts/JosefinSlab-Medium.ttf'),
  //   'JosefinSlab-SemiBold': require('../../assets/fonts/JosefinSlab-SemiBold.ttf'),
  //   'JosefinSlab-Bold': require('../../assets/fonts/JosefinSlab-Bold.ttf'),
  // });

  // useEffect(() => {
  //   const hideSplashScreen = async () => {
  //     if (fontsLoaded) {
  //       setTimeout(async () => {
  //         await SplashScreen.hideAsync();
  //       }, 2000); // wait for 2 seconds before hiding splash screen
  //     }
  //   };
  
  //   hideSplashScreen();
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF']} style={styles.linearGradient}>
        <View style={styles.dashboardTab}>
          <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity 
              onPress={() => {navigation.navigate('Profile', { screen: 'HomeScreen' });}}>
              <Image source={require('../../assets/Vector.png')} style={{width: 50, height: 50}}/>
            </TouchableOpacity>
            <Text style={styles.searchHeader}>Another day,{"\n"}Another product</Text>

            <TouchableOpacity style={{ marginLeft: 'auto'}}>
              <Image source={require('../../assets/notification-icon.png')} style={{width: 21, height: 24, marginLeft: 'auto'}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.scanProductContainer}>
            <Image source={require('../../assets/barcode.png')} style={styles.imageBarcode} />
            <Text style={styles.descriptionScanBtn}>Look after the barcode and</Text>
            <ScanButton />
          </View>

          <View style={styles.searchProductContainer}>
            
            <Text style={styles.alternativeSearch}>Alternatively, you can enter the barcode:</Text>

            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter text here"
              style={styles.searchInput}
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default HomeTab

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    paddingTop: 32,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'flex-start',
  },
  dashboardTab: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 32
  },
  searchHeader: {
    textAlign: 'left',
    fontSize: 26,
    fontWeight: '600',
    // fontFamily: 'JosefinSlab-Bold',
    margin: 0,
    marginLeft: 18,
  },
  descriptionScanBtn: {
    fontSize: 20,
    // fontFamily: 'JosefinSlab-Medium',
    marginBottom: -10
  },
  imageBarcode: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  scanProductContainer: {
    width: '100%',
    height: 320,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 32,
  },
  searchProductContainer: {
    width: '100%',
    marginTop: 'auto'
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 48,
    padding: 16,
    borderColor: '#000',
    borderWidth: 2,
    fontSize: 18,
    // fontFamily: 'JosefinSlab-Regular',
  },
  alternativeSearch: {
    // fontFamily: 'JosefinSlab-Regular',
    fontSize: 16,
    marginBottom: 12
  }
});