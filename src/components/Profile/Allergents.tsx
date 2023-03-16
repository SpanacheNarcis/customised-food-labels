import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, Switch, TextInput, Keyboard} from 'react-native'

import { updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import AllergentsList from './AllergentsList';

const Allergents = () => {
  const [showContent, setShowContent] = useState(false);
  const [newAllergent, setNewAllergent] = useState(null);

  const handlePress = () => {
    setShowContent(!showContent);
  };

  const addAllergent =  async () => {
    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, "users", user.email);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data() || {};
      const updatedAllergents = [...(userData.allergents || []), newAllergent];
      await updateDoc(userDocRef, { allergents: updatedAllergents });
      console.log('Allergent added successfully');
    } catch (error) {
      console.error('Error adding allergent:', error);
    }
  };
  
  return (
    <View style={styles.informationContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.informationToggle}>
        <Text style={styles.informationToggleText}>Allergents</Text>
      </TouchableOpacity>
      {showContent && 
        <View style={styles.contentToggle}>
          <View>
            <View >
              <Text style={{fontSize: 20}}>Add Allergents <Text style={{fontSize: 14}}>(one at a time)</Text></Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                <TextInput 
                  style={styles.input}
                  onChangeText={newAllergent => setNewAllergent(newAllergent)}
                  onSubmitEditing={addAllergent}
                  placeholder="Garlic"
                />
                <TouchableOpacity 
                  style={styles.addBtn}
                  onPress={addAllergent}
                  >
                  <Text style={{color: '#fff', fontSize: 30}}>+</Text>
                </TouchableOpacity>
                </View>
            </View>
          </View>

          <AllergentsList />
        </View>}
    </View>
  );
}

export default Allergents

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