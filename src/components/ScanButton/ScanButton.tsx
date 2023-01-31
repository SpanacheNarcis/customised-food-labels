import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ActionButton() {
  const navigation= useNavigation()

  const goToLogin = () => {
    navigation.navigate("LoginScreen");
    setModalVisible(!modalVisible);
  }

  const goToGuestHomeScreen = () => {
    navigation.navigate("GuestHomeScreen");
    setModalVisible(!modalVisible);
  }

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
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
      <TouchableOpacity
        style={styles.openModal}
        onPress={() => setModalVisible(true)}
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
    // borderColor: '#2F92A4',
    // borderWidth: 1,
    // minWidth: 226,
    // marginBottom: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    // height: 56,
    // borderRadius: 48,
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: -1,
    //   height: -200
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
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
    top:8,
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