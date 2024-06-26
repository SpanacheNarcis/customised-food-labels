import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ingredients from './Ingredients';
import NutritionFacts from './NutritionFacts';

const  NavigationPDP = ({product}) => {
  const Tab = createMaterialTopTabNavigator();

  const productIngredients = product.ingredients;
  const productNutriments = product.nutriments;
  const productServingSize = product.serving_quantity;



  const IngredientsComponent = () => {
    return <Ingredients productIngredients={productIngredients} />;
  };

  const NutritionFactsComponent = () => {
    return <NutritionFacts productNutriments={productNutriments} productServingSize={productServingSize} />;
  };

  return (
    <View style={{ height: '60%', borderRadius: 12}}>
      <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: 50,
          width: '100%',
          backgroundColor: '#B4D6D3',
          marginTop: 16,
          marginBottom: 16,
          borderRadius: 48,
        },
        tabBarLabel: ({  color }) => (
          <Text style={{ fontSize: 12, color, marginTop: 4 }}>
            {route.name}
          </Text>
        ),
      })}
      >
        <Tab.Screen options={{headerShown: false}} name="Ingredients" component={IngredientsComponent} />
        <Tab.Screen options={{headerShown: false}} name="Nutrition Facts" children={NutritionFactsComponent} />
      </Tab.Navigator>
    </View>
  )
}

export default NavigationPDP