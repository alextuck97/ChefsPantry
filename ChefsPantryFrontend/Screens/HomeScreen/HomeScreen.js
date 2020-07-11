import React, { useState } from 'react';
import {Button, 
        View, 
        SafeAreaView, 
        FlatList, 
        TextInput, 
        StyleSheet} from 'react-native';

import IngredientParam from "./IngredientParam";
import { ScrollView } from 'react-native-gesture-handler';


let defaultQuery = ["pepper", "corn", "steak"];

const HomeScreen = ({navigation}) => {

    const [ingredientQuery, setIngredientQuery] = useState(defaultQuery);
    const [text, onChangeText] = useState("");
    
    const renderIngredientParam = ({item, index}) => {
        
        <IngredientParam name={item} removeIngredient={removeIngredient}/>
        
    }
    
    //Add ingredient to query list
    const addIngredient = (ingredient) => {
        let current = [...ingredientQuery];

        if(current.length < 5)
        {
            current.push(ingredient);
            onChangeText("");
        }
        setIngredientQuery([...current]);
    }

    //Remove ingredient from query list
    const removeIngredient = (ingredient) => {
        
        let current = [...ingredientQuery];
        let index = current.findIndex(e => e === ingredient);
        console.log(index);
        if(index != -1){
            current.splice(index, 1); 
        }
        setIngredientQuery([...current]);
        console.log(ingredientQuery);
    }

    //navigation.navigate("Recipe", {recipe : recipe});
    return (
        <SafeAreaView style={{flex : 1}}>
            <TextInput style={pageStyles.textInput} 
                       value={text} 
                       onChangeText={(text)=>onChangeText(text)}
                       onSubmitEditing={()=>addIngredient(text)}
                       placeholder="Add another ingredient..."/>

            <ScrollView contentContainerStyle={pageStyles.scrollView}>
                {ingredientQuery.map((item, index) => {
                    return <IngredientParam name={item} removeIngredient={removeIngredient}/>
                })}
                
            </ScrollView>
            
            

        </SafeAreaView>
        
    )

}


const pageStyles = StyleSheet.create({
    textInput : {
        borderColor : "gray",
        borderWidth : 1,
        margin : 15,
        height : 40,
        backgroundColor : "white"
    },

    scrollView : {
        flex : 1,
        flexDirection : "row",
        flexWrap : "wrap"
    }
})




export default HomeScreen;