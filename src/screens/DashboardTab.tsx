import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

const DashboardTab = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#B4D6D3', '#FFFFFF']}  style={styles.linearGradient}>
        <Text>Hello from Dashboard Tab</Text>
      </LinearGradient>
    </View>
  )
}

export default DashboardTab

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    width: '100%', 
    paddingTop: 50,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});