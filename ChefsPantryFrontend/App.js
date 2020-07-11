/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RecipeScreen from './Screens/RecipeViewScreen/RecipeScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{title : "Chef's Pantry"}}
        />
        <Stack.Screen 
          name="Recipe"
          component={RecipeScreen}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
