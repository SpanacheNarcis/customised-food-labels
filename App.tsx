// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
// import Vouched from './src/components/Vouched/Vouched';
// import {LinearGradient} from 'expo-linear-gradient';
// import ActionButton from './src/components/Main-CTA-Button/ActionButton';
// import LatestHeroes from './src/components/Latest-Heroes/LatestHeroes';
// import Header from './src/components/Header/Header'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './src/screens/LoginScreen';
// import RegisterScreen from './src/screens/RegisterScreen';
import FirstScreen from './src/screens/FirstScreen';
import GuestHomeScreen from './src/screens/GuestMode/GuestHomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="FirstScreen" component={FirstScreen} />
        <Stack.Screen options={{headerShown: false}} name="GuestHomeScreen" component={GuestHomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{headerShown: false}} name="ProductDetailsScreen" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
