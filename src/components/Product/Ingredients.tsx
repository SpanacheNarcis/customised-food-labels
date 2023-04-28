import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

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


const Ingredients = ({ productIngredients }:ProductIngredients) => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.email);

    getDoc(userDocRef)
      .then((doc) => {
        if(doc.exists) {
          const userData = doc.data();
          setAllergens(userData?.allergens || []);
        } else {
          console.log("document not found");
        }
      })
      .catch((error) => {
        console.log("error getting document: ", error);
      });
  }, []);

  const containAllergen = (str: string, allergen: string) => {
    return str.toLowerCase().split(' ').includes(allergen.toLowerCase());
  }

  const allergenIngredients: Ingredient[] = [];
  const nonAllergenIngredients: Ingredient[] = [];

  productIngredients?.forEach((ingredient) => {
    if (allergens.some((allergen) => containAllergen(ingredient.text, allergen))) {
      allergenIngredients.push(ingredient);
    } else {
      nonAllergenIngredients.push(ingredient);
    }
  });
  
  const ingredients = [...allergenIngredients, ...nonAllergenIngredients];

  return (
    <ScrollView style={styles.container}>
      {allergenIngredients.length > 0 && (
        <View style={{marginLeft: 4, marginBottom: 10}}><Text style={{fontWeight: 'bold'}}>We found some allergens and placed them at the beginning</Text></View>
      )}
      {ingredients && (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignSelf: "flex-start" }}>
          {ingredients.map((ingredient: Ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <Text
                key={index}
                style={{
                  textTransform: 'capitalize',
                  color: allergens.some((allergen) => containAllergen(ingredient.text, allergen)) ? 'red' : 'black',
                  marginRight: 4,
      
                }}
              >{ingredient.text}</Text>
            </View>
          ))}
        </View>)}
    </ScrollView>
  )
}

export default Ingredients

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
  },
  ingredientContainer: {
    alignSelf: "flex-start",
    padding: 5,
    margin: 5,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
  }
});