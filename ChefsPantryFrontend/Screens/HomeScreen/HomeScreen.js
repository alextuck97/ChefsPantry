import React, { useState } from 'react';
import {Button, 
        View, 
        SafeAreaView, 
        FlatList, 
        TextInput, 
        StyleSheet,
        ActivityIndicator } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import IngredientParam from "./IngredientParam";
import RecipeResult from "./RecipeResult";
import Loader from "../Loader";
import requests from './Requests';

const test_recipe_obj = {"_id":{"$oid":"5f04f3452be79d51af283a69"},"recipe":{"title":"Creamy Crock Pot Pork Chops Potatoes & Onions","description":"Creamy Crock Pot Pork Chops Potatoes & Onions is an easy comfort food dinner that only takes a few ingredients and a few minutes to prepare.  These slow cooker pork chops are a hit!","minutes":"18","hours":"0","ingredients":["yellow onion","red potatoes","boneless pork chops ","cream of mushroom soup","dry ranch dressing mix","ground black peppe","olive oil"]},"url":"https://www.thewholesomedish.com/creamy-crock-pot-pork-chops-potatoes-onions/","sitetitle":"The Wholesome Dish"};
const test_matches = 3;

let defaultQuery = ["pepper", "corn", "steak"];

const HomeScreen = ({navigation}) => {

    const [ingredientQuery, setIngredientQuery] = useState([]);
    const [text, onChangeText] = useState("");
    const [loading, onLoadChange] = useState(false);
    const [recipes, setLoadedRecipes] = useState([]);
    
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

    //Query api with the current ingredient list
    const searchClick = () => {
        if(ingredientQuery.length === 0 || ingredientQuery.length > 5){
            return;
        }
        
        onLoadChange(true);

        requests.queryRecipe(ingredientQuery).then((result) => {
            
            setLoadedRecipes(result);
        }).catch(er => console.log(er))
        .finally(() => {
            onLoadChange(false)
        });
    }

   
    

    //navigation.navigate("Recipe", {recipe : recipe});
    return (
        <SafeAreaView style={{flex : 1}}>
            
            <Loader loading={loading}/>
            
            <TextInput style={pageStyles.textInput} 
                       value={text} 
                       onChangeText={(text)=>onChangeText(text)}
                       onSubmitEditing={()=>addIngredient(text)}
                       placeholder="Add another ingredient..."/>

            <View style={pageStyles.searchButtonContainer}>
                <Button color="#2bc234"  title={"Search"} onPress={() => searchClick()} />
                <Button color="#e64c35" title={"Clear"} onPress={() => setIngredientQuery([])}/>

            </View>
            
            <View style={pageStyles.queryTags}>
                {ingredientQuery.map((item, index) => {
                        return <IngredientParam key={index} name={item} removeIngredient={removeIngredient}/>
                })}
            </View>
            
            <ScrollView>
                {Object.entries(recipes).map(([key, value], index) => {
                    return <RecipeResult 
                                key={key} 
                                recipeKey={key} 
                                recipeData={value} 
                                navigation={navigation}
                                setLoading={onLoadChange}/>
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
        marginBottom : 10,
        height : 40,
        backgroundColor : "white"
    },

    queryTags : {
        flexDirection : "row",
        flexWrap : "wrap"
    },

    searchButtonContainer : {
        flexDirection : "row", 
        justifyContent : "space-around",
        marginBottom : 5
    }
})




export default HomeScreen;