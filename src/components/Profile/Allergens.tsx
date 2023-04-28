import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, Switch, TextInput, Keyboard} from 'react-native'

import { updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import AllergensList from './AllergensList';

const Allergens = () => {
  const [showContent, setShowContent] = useState(false);
  const [newAllergen, setNewAllergen] = useState(null);

  const handlePress = () => {
    setShowContent(!showContent);
  };

  const addAllergen =  async () => {
    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, "users", user.email);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data() || {};
      const updatedAllergens = [...(userData.allergens || []), newAllergen];
      await updateDoc(userDocRef, { allergens: updatedAllergens });
      console.log('Allergen added successfully');
    } catch (error) {
      console.error('Error adding allergen:', error);
    }
  };
  
  return (
    <View style={styles.informationContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.informationToggle}>
        <Text style={styles.informationToggleText}>Allergens</Text>
      </TouchableOpacity>
      {showContent && 
        <View style={styles.contentToggle}>
          <View>
            <View >
              <Text style={{fontSize: 20}}>Add Allergens <Text style={{fontSize: 14}}>(one at a time)</Text></Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                <TextInput 
                  style={styles.input}
                  onChangeText={newAllergen => setNewAllergen(newAllergen)}
                  onSubmitEditing={addAllergen}
                  placeholder="Garlic"
                />
                <TouchableOpacity 
                  style={styles.addBtn}
                  onPress={addAllergen}
                  >
                  <Text style={{color: '#fff', fontSize: 30}}>+</Text>
                </TouchableOpacity>
                </View>
            </View>
          </View>

          <AllergensList />
        </View>}
    </View>
  );
}

export default Allergens

const styles = StyleSheet.create({
  informationContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#99AAAB',
    borderRadius: 12
  },
  informationToggle: {
    padding: 10,
    backgroundColor: '#99AAAB',
    borderRadius: 10
  },
  informationToggleText: {
    color: '#fff',
    fontSize: 18
  },
  contentToggle: {
    padding: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    borderColor: '#99AAAB',
    borderWidth: 1,
    fontSize: 18,
  },
  addBtn: {
    alignSelf: 'center',
    backgroundColor: '#2F92A4',
    paddingTop: 2,
    paddingBottom: 6,
    paddingHorizontal: 14,
    borderRadius: 48,
    marginLeft: 20
  }
});