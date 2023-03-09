import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

const NutritionFacts = ({nutriscore}) => {
  // console.log("🚀 ~ file: NutritionFacts.tsx:6 ~ NutritionFacts ~ props:", props)
  // const nutriscore = props;
  console.log("🚀 ~ file: NutritionFacts.tsx:6 ~ NutritionFacts ~ nutriscore:", nutriscore)
  return (
    <View style={styles.container}>
        <Text> {nutriscore}</Text>
    </View>
  )
}

export default NutritionFacts

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 12,
  },
});