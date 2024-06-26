
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from './src/screens/FirstScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { ProductProvider } from './src/context/ProductContext';
import { AuthProvider } from './src/context/AuthProvider';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ProductProvider>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="FirstScreen" component={FirstScreen} />
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen options={{ headerShown: false }} name="ProductDetailsScreen" component={ProductDetailsScreen} />
          </Stack.Navigator>
        </ProductProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
