import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

interface Ingredient {
  id: string;
  percent: number;
  percent_estimate: number;
  rank: number;
  text: string;
}

interface ProductIngredients {
  productIngredients: Ingredient[]
}


const Product = () => {

  return (
    <ScrollView style={styles.container}>
      {productIngredients && (
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {productIngredients.map((ingredient:Ingredient, index) => (
            <Text key={index} style={{textTransform: 'capitalize'}}>{ingredient.text}</Text>
          ))}
        </View>)}
    </ScrollView>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
  },
});