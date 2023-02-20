import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, SafeAreaView, Platform, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import ActionButton from '../../components/ScanButton/ScanButton';
import { BarCodeScanner } from 'expo-barcode-scanner';

const DashboardScreen = () => {
  const [inputValue, setInputValue] = React.useState("");

  // const [hasPermission, setHasPermission] = React.useState(false);
  // const [scanData, setScanData] =  React.useState();

  // const askForCameraPermissions = () => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status == 'granted')
  //   })
  // }

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status == 'granted')
  //   })();
  // }, []);

  // if(!hasPermission) {
  //   return (
  //     <View><Text>Please grant camera permissions to app.</Text></View>
  //   )
  // }

  // const handleBarCodeScanned = ({type, data}) => {
  //   setScanData(data)
  //   console.log('Type: ' + type + '\nData: ' + data)
  // } 

  const openScanner = () => {

  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF']} style={styles.linearGradient}>
        <View style={styles.dashboardTab}>
          <View style={styles.scanProductContainer}>
            <Text style={styles.searchHeader}>Search for a product</Text>
            <Image source={require('../../../assets/barcode.png')} style={styles.imageBarcode} />
            <Text style={{ fontSize: 18 }}>Just grab an item and</Text>
            <ActionButton type='openScanner'/>
          </View>

          <View style={styles.searchProductContainer}>
            {/* <BarCodeScanner 
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}/>

            <Text>{scanData}</Text>
            {scanData && <Button title='scan again?' onPress={()=> setScanData(undefined)} />} */}

            {/* <KeyboardAwareScrollView>
              <SafeAreaView>
                <TextInput
                  style={styles.searchInput}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="useless placeholder"
                  // keyboardType="numeric"
                />
              </SafeAreaView>
            </KeyboardAwareScrollView> */}
            {/* <SafeAreaView> */}
            <Text style={{ marginBottom: 12, paddingLeft: 18 }}>Alternatively, you can enter the barcode:</Text>
            {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "height"}> */}
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter text here"
              style={styles.searchInput}
            />
            {/* </KeyboardAvoidingView> */}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default DashboardScreen

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 48
  },
  searchHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  imageBarcode: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  scanProductContainer: {
    width: '100%',
    height: 375,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  searchProductContainer: {
    width: '100%'
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 48,
    padding: 16,
    borderColor: '#000',
    borderWidth: 2,
  }
});