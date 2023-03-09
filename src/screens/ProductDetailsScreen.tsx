import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import NavigationPDP from '../components/NavigationPDP';
import { ProductContext } from './ProductContext';

const API_URL = 'https://world.openfoodfacts.org/api/v0/product/';

const ProductDetailsScreen = ({ route }) => {
  const { data } = route.params;
  const [product, setProduct] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const { setLastScannedProduct } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${data}.json`);
        const json = await response.json();
        setProduct(json);
        setLastScannedProduct(json); // Set the last product scanned in the context
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data, setLastScannedProduct]);

  const renderProductInfo = () => {
    if (!product || !product.product || product.status_verbose !== 'product found') {
      return (
        <View>
          <Text>Product not found</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>
          Barcode: <Text style={styles.bold}>{product.code}</Text>
        </Text>
        <View style={styles.imageContainer}>
          {product.product.image_url ? (
            <Image
              source={{
                uri: product.product.image_url,
              }}
              style={styles.image}
            />
          ) : null}
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.product.product_name}</Text>
            {product.product.nutriscore_grade ? (
            <Text style={styles.nutriscore}>
              Nutri-score {product.product.nutriscore_grade}
            </Text>
            ) : (
            <Text>
              Nutri-score not available
            </Text>
            )}
          </View>
        </View>

        <View style={styles.quantityBrand}>
            {product.product.quantity ? (
              <Text style={styles.quantity}>Quantity: {product.product.quantity}</Text>
            ) : null}
            {product.product?.brand ? (
              <Text style={styles.brand}>Brand: {product.product.brands}</Text>
            ) : null}
        </View>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Search for an ingredient"
          style={styles.input}
        />
        <NavigationPDP product={product.product}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF']} style={styles.linearGradient}>
        <View style={styles.contentContainer}>{renderProductInfo()}</View>
      </LinearGradient>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  image: {
    width: '30%',
    height: 125,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
    flexWrap: 'wrap',
  },
  input: {
    paddingVertical: 16, 
    paddingHorizontal: 32, 
    borderColor: '#000', 
    borderWidth: 1, 
    color: '#91C5BC', 
    backgroundColor: '#fff', 
    borderRadius: 48, 
    marginTop: 20
  },
  productName: {
    alignSelf: 'flex-start', 
    marginBottom: 20, 
    fontSize: 18
  },
  nutriscore: {
    textTransform: 'capitalize', 
    textDecorationLine: 'underline', 
    fontSize: 20
  },
  brand: {
    fontWeight: 'bold'
  },
  quantity: {
    fontWeight: 'bold'
  },
  quantityBrand: {
    marginTop: 20, 
    display: 'flex', 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between'
  }
})