import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './DashboardScreen';
import LearnScreen from './LearnScreen';

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if(route.name === "Dashboard") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
          } else if (route.name === "Learn") {
            iconName = focused ? "book-open-blank-variant" : "book";
          }
          return <MaterialCommunityIcons name={iconName ? iconName : ""} size={24} color={color} />
        }, 
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: 80,
          backgroundColor: '#B4D6D3',
          margin: 12,
          paddingTop: 16,
          borderRadius: 48,
        },
        tabBarLabel: ({  color }) => (
          <Text style={{ fontSize: 12, color, marginTop: 4 }}>
            {route.name}
          </Text>
        ),
      })}
      >
        <Tab.Screen options={{headerShown: false}} name="Dashboard" component={DashboardScreen}/>
        <Tab.Screen options={{headerShown: false}} name="Learn" component={LearnScreen}/>
      </Tab.Navigator>
    </View>
  )
}

export default HomeScreen