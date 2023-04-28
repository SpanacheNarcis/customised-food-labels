import { ParamListBase, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Modal, StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductContext } from "../context/ProductContext";

export default function LastProduct({updateState}) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const { lastScannedProduct } = useContext(ProductContext);
  const data = lastScannedProduct.code

  const handleClick = () => {
    updateState(false);
    navigation.navigate("ProductDetailsScreen", {data})
  }

  return (
    <TouchableOpacity onPress={() => handleClick()} style={styles.lastProduct}>
      <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 20 }}>
        {lastScannedProduct.product.image_url ? (
          <Image source={{ uri: lastScannedProduct.product.image_url }} style={styles.imageProduct} />
        ) : null}
        <View style={{flex: 1,flexWrap: 'wrap',}}>
          <Text style={{alignSelf: 'flex-start'}}>{lastScannedProduct.product.product_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageProduct: {
    width: '30%',
    height: 100,
    marginRight: 20,
    marginLeft: -20,
  },
  lastProduct: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 20
  }
});