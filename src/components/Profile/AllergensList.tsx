import { getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AllergensList = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      return
    }
    const userDocRef = doc(db, "users", user.email);

    getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setAllergens(userData.allergens || []);
        } else {
          console.log("document not found");
        }
      })
      .catch((error) => {
        console.log("error getting document: ", error);
      });

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists) {
        const userData = doc.data();
        setAllergens(userData.allergens || []);
      } else {
        console.log("document not found")
      }
    })

    return unsubscribe;
  }, []);

  const deleteAllergen = async (allergenToDelete) => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
  
    const userDocRef = doc(db, "users", user.email);
    const userDoc = await getDoc(userDocRef);
  
    if (userDoc.exists) {
      const userData = userDoc.data();
      const updatedAllergens = userData.allergens.filter((item) => item !== allergenToDelete);
  
      await setDoc(userDocRef, { allergens: updatedAllergens }, { merge: true });
    }
  };

  const renderAllergen = (allergen, index) => {
    const handleDelete = () => {
      deleteAllergen(allergen);
    };
  
    return (
      <View key={index} style={styles.allergen}>
        <Text>{allergen}</Text>
        <TouchableOpacity onPress={handleDelete} style={{ marginRight: 20 }}>
          <MaterialCommunityIcons name="trash-can" size={24} color='#000' />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Allergens:</Text>
      {allergens.length > 0 ? (
        allergens.map((allergen, index) => renderAllergen(allergen, index))
      ) : (
        <Text>You have no allergens</Text>
      )}
    </View>
  );
};

export default AllergensList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  allergen: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
});
