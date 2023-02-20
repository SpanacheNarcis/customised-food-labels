import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';

type mode = {
  type?: string;
};


export default function ActionButton(props: mode) {
  const navigation = useNavigation()

  const goToLogin = () => {
    navigation.navigate("LoginScreen");
    setModalVisible(!modalVisible);
  }

  const goToGuestHomeScreen = () => {
    navigation.navigate("GuestHomeScreen");
    setModalVisible(!modalVisible);
  }

  // const openScanner = () => {}

  const [modalVisible, setModalVisible] = useState(false);

  const [openScanner, setOpenScanner] = useState(false);

  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data)
    console.log('Type: ' + type + '\nData: ' + data)
    setOpenScanner(false)
    {navigation.navigate("ProductDetailsScreen", {data})
    }
  }

  return (
    <View style={styles.centeredView}>
      {props.type == 'openModal' &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          // presentationStyle='pageSheet'
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredViewModal}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>For a better experience, we recommend to </Text>

              <TouchableOpacity
                style={styles.containerLogin}
                onPress={goToLogin}
              >
                <Text style={styles.buttonLogin}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.continueAs}>or continue as</Text>

              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyleClose}>X</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerGuestUser}
                onPress={goToGuestHomeScreen}
              >
                <Text style={styles.buttonGuestUser}>Guest user</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
      {props.type == 'openScanner' &&
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
            <Text style={{ maxWidth: '70%', marginLeft: 20, fontSize: 16, fontWeight: '500'}}>The barcode is usually located on the back of the product</Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setOpenScanner(!openScanner)}
            >
              <Text style={styles.textStyleClose}>X</Text>
            </TouchableOpacity>
            </View>

            <View style={{ height: '80%' }}>

              <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanData ? undefined : handleBarCodeScanned} />
            </View>

            <Text>{scanData}</Text>
            {scanData && <Button title='scan again?' onPress={() => setScanData(undefined)} />}

          </View>
        </Modal>
      }
      <TouchableOpacity
        style={styles.openModal}
        onPress={() => props.type == 'openModal' ? setModalVisible(true) : setOpenScanner(true)}
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
    textAlign: "center"
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
  }
});