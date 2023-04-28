import { getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const AllergensList = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.email);

    getDoc(userDocRef)
      .then((doc) => {
        if(doc.exists) {
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
      if(doc.exists) {
        const userData = doc.data();
        setAllergens(userData.allergens || []);
      } else {
        console.log("document not found")
      }
    })

    return unsubscribe;
  }, []);

  const renderAllergen = (allergen, index) => {
    return (
      <View key={index} style={styles.allergen}>
        <Text>{allergen}</Text>
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
  },
});
