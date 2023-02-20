import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import ScanButton from '../components/ScanButton/ScanButton';
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';

const ProductDetailsScreen = ({ route }) => {
  const { data } = route.params;
  const [product, setProduct] = useState(null);
  const [inputValue, setInputValue] = React.useState("");


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
  
      const json = await response.json();
      setProduct(json);
    }

    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF']} style={styles.linearGradient}>
        <View style={{width: '100%'}}>
          {product?.product && product.status_verbose === 'product found' ? (
            <View>
              <Text>Barcode: <Text style={{fontWeight: 'bold'}}>{product.code}</Text></Text>
              <View style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                {product.product?.image_url ? (
                  <Image
                  source={{
                    uri: product.product.image_url,
                  }}
                  style={{width: '30%', height: 125, marginRight: 20}}/>
                ) : (<Text></Text>)}
        
                <View style={{flex: 1, flexWrap: 'wrap', width: '70%'}}>
                  <Text style={{ alignSelf: 'flex-start', marginBottom: 20, fontSize: 18}}>{product.product?.product_name}</Text>
                  <Text style={{ textTransform: 'capitalize', textDecorationLine: 'underline', fontSize: 20}}>Nutri-score {product.product?.nutriscore_grade} </Text>
                </View>
              </View>

              <View style={{marginTop: 20}}>
                {product.product?.quantity ? (
                  <Text>Quantity: {product.product.quantity}</Text>
                ) : (<Text></Text>)}
                {product.product?.brands ? (
                  <Text>Brand: <Text style={{fontWeight: 'bold'}}>{product.product.brands}</Text></Text>
                ) : (<Text></Text>)}
              </View>

              <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Search for an ingredient"
              style={{paddingVertical: 16, paddingHorizontal: 32, borderColor: '#000', borderWidth: 1, color: '#91C5BC', backgroundColor: '#fff', borderRadius: 48, marginTop: 20}}
              />
            </View>


          ) : (
            <View>
              <Text>Product not found</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  )
}

export default ProductDetailsScreen

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