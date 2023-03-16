import { getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const AllergentsList = () => {
  const [allergents, setAllergents] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.email);

    getDoc(userDocRef)
      .then((doc) => {
        if(doc.exists) {
          const userData = doc.data();
          setAllergents(userData.allergents || []);
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
        setAllergents(userData.allergents || []);
      } else {
        console.log("document not found")
      }
    })

    return unsubscribe;
  }, []);

  const renderAllergent = (allergent, index) => {
    return (
      <View key={index} style={styles.allergent}>
        <Text>{allergent}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Allergents:</Text>
      {allergents.length > 0 ? (
        allergents.map((allergent, index) => renderAllergent(allergent, index))
      ) : (
        <Text>You have no allergents</Text>
      )}
    </View>
  );
};

export default AllergentsList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  allergent: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
