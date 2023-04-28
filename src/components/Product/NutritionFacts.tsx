import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import NutritionRow from "./NutritionRow"

const NutritionFacts = ({ productNutriments, productServingSize }) => {
  const [openCustomSize, setOpenCustomSize] = useState(false)
  const [customSize, setCustomSize] = useState(0);
  const handleButtonModal = () => {
    if(!customSize) {
      setOpenCustomSize(false)
    } else {
      setOpenCustomSize(false)
    }
  } 

  let servingSize = customSize ? customSize : productServingSize
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Nutrition Information
          </Text>

          <TouchableOpacity 
            style={styles.customSize}
            onPress={() => setOpenCustomSize(true)}
          >
            <Text style={{ color: '#fff' }}>Custom size</Text>
          </TouchableOpacity>
          <Modal isVisible={openCustomSize}>
            <View style={{ backgroundColor: '#fff', paddingVertical: 32, paddingHorizontal: 20}}>
              <Text>You can enter a custom portion size to display nutritional information about:</Text>
              <TextInput
                onChangeText={input => setCustomSize(input)}
                placeholder='200'
                placeholderTextColor='#ccc'
                keyboardType="numeric"
                style={{borderWidth: 1, borderColor: '#62A89A', marginTop: 20, padding: 10,paddingLeft: 20, maxWidth: 100, borderRadius: 45, backgroundColor: '#EDF5F4', color: '#000'}}
              />
              <TouchableOpacity 
                style={styles.buttonModal}
                onPress={() => handleButtonModal()}
              >
                {customSize ? (
                  <Text style={{ color: '#fff', textAlign: 'center'}}>See nutritional information</Text>
                ) : (
                  <Text style={{textAlign: 'center'}}>Close</Text>
                )}
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <NutritionRow 
          information="Serving Size:"
          valueFor100={100}
          measurementUnit={'g'}
          servingSize={servingSize}
          customSize={customSize}
        />

        <NutritionRow 
          information="Energy:"
          valueFor100={productNutriments['energy-kcal_value']}
          measurementUnit={productNutriments['energy-kcal_unit']}
          servingSize={servingSize}
          customSize={customSize}
          odd={true}
        />

        <NutritionRow 
          information="Fat:"
          valueFor100={productNutriments['fat_100g']}
          measurementUnit={productNutriments['fat_unit']}
          servingSize={servingSize}
          customSize={customSize}
        />

        <NutritionRow 
          information="of which saturates:"
          valueFor100={productNutriments['saturated-fat_100g']}
          measurementUnit={productNutriments['saturated-fat_unit']}
          servingSize={servingSize}
          customSize={customSize}
          odd={true}
          ofWhich={true}
        /> 

        <NutritionRow 
          information="Carbohydrate:"
          valueFor100={productNutriments['carbohydrates_100g']}
          measurementUnit={productNutriments['carbohydrates_unit']}
          servingSize={servingSize}
          customSize={customSize}
        />

        <NutritionRow 
          information="of which sugars:"
          valueFor100={productNutriments['sugars_100g']}
          measurementUnit={productNutriments['sugars_unit']}
          servingSize={servingSize}
          customSize={customSize}
          odd={true}
          ofWhich={true}
        /> 

        <NutritionRow 
          information="Fiber:"
          valueFor100={productNutriments['fiber_100g']}
          measurementUnit={productNutriments['fiber_unit']}
          servingSize={servingSize}
          customSize={customSize}
        /> 

        <NutritionRow 
          information="Protein:"
          valueFor100={productNutriments['proteins_100g']}
          measurementUnit={productNutriments['proteins_unit']}
          servingSize={servingSize}
          customSize={customSize}
          odd={true}
        />    

        <NutritionRow 
          information="Salt:"
          valueFor100={productNutriments['salt_100g']}
          measurementUnit={productNutriments['salt_unit']}
          servingSize={servingSize}
          customSize={customSize}
        />  
      </View>
    </ScrollView>
  );
};

export default NutritionFacts;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  customSize: {
    borderWidth: 1,
    borderColor: '#62A89A',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#99AAAB',
    borderRadius: 12
  },
  buttonModal: {
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: '#99AAAB',
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'flex-start'
  }, 
  fontBold: {
    fontWeight: '700'
  },
  null: {}
});
