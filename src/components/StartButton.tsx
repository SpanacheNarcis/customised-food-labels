import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function StartButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
    setModalVisible(!modalVisible);
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
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
                onPress={goToHomeScreen}
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
        <Text style={styles.textStyle}>Let's start!</Text>
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
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    // fontFamily: 'JosefinSlab-Medium'
  },
  buttonGuestUser: {
    fontSize: 24,
    textAlign: 'center',
    color: '#18201F',
    textDecorationLine: 'underline',
    // fontFamily: 'JosefinSlab-Regular'
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
  buttonClose: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "600",
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
    textAlign: "center",
    // fontFamily: "JosefinSlab-SemiBold"
  },
  continueAs: {
    fontSize: 18,
    color: '#18201F',
    marginBottom: 20,
    // fontFamily: 'JosefinSlab-Regular'
  }
});