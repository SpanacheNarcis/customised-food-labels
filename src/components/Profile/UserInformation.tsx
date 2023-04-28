import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, Switch, TextInput, Keyboard} from 'react-native'

import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';

const UserInformation = () => {
  const [showContent, setShowContent] = useState(false);

  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const handlePress = () => {
    setShowContent(!showContent);
    const user = auth.currentUser; 
  };

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, "users", user.email);
      await updateDoc(userDocRef, {
        age: age,
        height: height,
        weight: weight
      });
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if(!auth.currentUser) {
      return
    }
    const user = auth?.currentUser;
    const userDocRef = doc(db, "users", user?.email);

    getDoc(userDocRef)
      .then((doc) => {
        if(doc.exists) {
          const userData = doc.data();
          setAge(userData?.age || '');
          setWeight(userData?.weight || '');
          setHeight(userData?.height || '');
        } else {
          console.log("document not found");
        }
      })
      .catch((error) => {
        console.log("error getting document: ", error);
      });
  }, []);

  
  return (
    <View style={styles.informationContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.informationToggle}>
        <Text style={styles.informationToggleText}>Profile Information</Text>
      </TouchableOpacity>
      {showContent && 
        <View style={styles.contentToggle}>
          <View style={styles.ageHeightWeight}>
            <View >
              <Text>Set age:</Text>
                <TextInput 
                  style={styles.input}
                  onChangeText={age => setAge(age)}
                  placeholder="23"
                  keyboardType="numeric"
                  value={age}
                />
            </View>
            <View>
              <Text style={{paddingRight: 10}}>Set height:</Text>
              <View>
                  <TextInput 
                    style={styles.input}
                    onChangeText={height => setHeight(height)}
                    placeholder="23"
                    keyboardType="numeric"
                    value={height}
                  />
                  <Text style={{position: 'absolute', right: 10, top: 20, fontSize: 18, color: '#999'}}>cm</Text>
                </View>
              </View>
            <View>
              <Text style={{paddingRight: 0}}>Set weight:</Text>
                <View>
                  <TextInput 
                    style={styles.input}
                    onChangeText={weight => setWeight(weight)}
                    placeholder="23"
                    keyboardType="numeric"
                    value={weight}
                  />
                  <Text style={{position: 'absolute', right: 10, top: 21, fontSize: 18, color: '#999'}}>kg</Text>
                </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.updateInformation}
            onPress={handleUpdate}
            >
            <Text style={{color: '#fff'}}>Update Information</Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
}

export default UserInformation

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
  ageHeightWeight: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
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

  updateInformation: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#2F92A4',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 48,
  }
});