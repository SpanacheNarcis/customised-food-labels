import { ParamListBase, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Modal, StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductContext } from "../screens/ProductContext";
import LastProduct from "./LastProducts";

export default function ScanButton() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const [modalVisible, setModalVisible] = useState(false);

  const [openScanner, setOpenScanner] = useState(false);

  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();
  const { lastScannedProduct } = useContext(ProductContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })();

    
  }, []);

  if (!hasPermission) {
    return (
      <View><Text>Please grant camera permissions to app.</Text></View>
    )
  }

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    console.log('Type: ' + type + '\nData: ' + data);
    setOpenScanner(false);
    console.log("🚀 ~ file: ScanButton.tsx:74 ~ ScanButton ~ scanData:", scanData)
    navigation.navigate("ProductDetailsScreen", {data: data});
    setScanData(undefined)
  }

  function updateState(newState) {
    setOpenScanner(newState);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
          animationType="slide"
          // transparent={true}
          visible={openScanner}
          presentationStyle='fullScreen'
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{paddingTop: 64}}>
            <View style={{height: '10%', display: 'flex', justifyContent: 'center'}}>
            <Text style={styles.titleOpenedScanner}>The barcode is usually located on the back of the product</Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setOpenScanner(!openScanner)}
            >
              <Text style={styles.textStyleClose}>X</Text>
            </TouchableOpacity>
            </View>

                <View style={{ height: lastScannedProduct ? '60%' : '85%', display: 'flex', flexDirection: 'column', }}>

                  <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={scanData ? undefined : handleBarCodeScanned} />
                </View>
                {lastScannedProduct ? (
                  <View>
                    <Text style={{margin: 16, textAlign: "center", fontSize: 24, fontWeight: '600'}}>Last product scanned</Text>
                    <LastProduct  updateState={updateState}/>
                  </View>
                ) : null}



          </View>
      </Modal>
      <TouchableOpacity
        style={styles.openModal}
        onPress={() => setOpenScanner(true)}
      >
        <Text style={styles.textStyle}>Scan a product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    backgroundColor: '#2F92A4',
    minWidth: 226,
    marginBottom: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    height: 56,
    borderRadius: 48,
  },
  openModal: {
    backgroundColor: '#2F92A4',
    minWidth: 226,
    marginBottom: 'auto',
    paddingHorizontal: 24,
    justifyContent: 'center',
    height: 56,
    borderRadius: 48,
  },
  containerGuestUser: {
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  buttonLogin: {
    fontSize: 21,
    textAlign: 'center',
    color: '#fff',
  },
  buttonGuestUser: {
    fontSize: 21,
    textAlign: 'center',
    color: '#18201F',
    textDecorationLine: 'underline',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: "#B4D6D3",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: '100%',
    height: 300
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    // fontFamily: 'JosefinSlab-Bold'
  },
  textStyleClose: {
    color: "#18201F",
    textAlign: "center",
    fontSize: 24,
  },
  modalText: {
    fontSize: 24,
    width: '100%',
    marginBottom: 15,
    textAlign: "center"
  },
  continueAs: {
    fontSize: 18,
    color: '#18201F',
    marginBottom: 20
  },
  titleOpenedScanner: {
    maxWidth: '70%',
    marginLeft: 20, 
    marginBottom: 20,
    fontSize: 18, 
    fontWeight: '600'
    // fontFamily: 'JosefinSlab-Bold'
  },
});