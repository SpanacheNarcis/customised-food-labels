import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './DashboardScreen';
import LearnScreen from './LearnScreen';
import {LinearGradient} from 'expo-linear-gradient';

const GuestHomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    // <NavigationContainer>
    //   <Tab.Navigator
    //   screenOptions={({route}) => ({
    //     tabBarIcon: ({focused, size}) => {
    //       let iconName;

    //       if(route.name === "Dashboard") {
    //         iconName = focused ? "view-dashboard" : "view-dashboard-outline";
    //       } else if (route.name === "Learn") {
    //         iconName = focused ? "book-open" : "book";
    //       }
    //       return <Ionic name={iconName} size={size} />
    //     }, 
    //   })}>
    //     <Tab.Screen name="Dashboard" component={DashboardScreen}/>
    //     <Tab.Screen name="Learn" component={LearnScreen}/>
    //   </Tab.Navigator>
    // </NavigationContainer>
    <View style={styles.container}>
    <LinearGradient colors={['#B4D6D3', '#FFFFFF', '#B4D6D3']}  style={styles.linearGradient}>
      <Text>Hello from Learn Screen</Text>
    </LinearGradient>
     </View>
  )
}

export default GuestHomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#B4D6D3',
  },
  // linearGradient: {
  //   flex: 1,
  //   width: '100%', 
  //   paddingTop: 50,
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   paddingHorizontal: 32,
  //   justifyContent: 'flex-start',
  // },
});