import React from 'react';
import { View, 
        Pressable, 
        StyleSheet,
        Text } from 'react-native';

import requests from "./Requests";


const RecipeResult = ({recipeKey, recipeData, navigation}) => {

    const { title, count } = recipeData;
    

    const onRecipePress = () => {
        requests.queryById(recipeKey).then(result => {
            navigation.navigate("Recipe", {recipeObject : result});
        }).catch(error => console.log(error));
    }


    return (

        <Pressable onPress={() => onRecipePress()}>
            <View style={style.container}>
                <View style={style.titleContainer}>
                    <Text style={style.title}>{title}</Text>
                </View>
                
                <View style={style.matchesContainer}>
                    <Text style={style.matches}>{count} matches</Text>
                </View>
                
            </View>
        </Pressable>
        
    )
}


const style = StyleSheet.create({
    container : {
        backgroundColor : "#f2eea2",
        borderColor : "#aba987",
        borderWidth : 1,
        flexDirection : "row",
        justifyContent : "space-evenly",
        marginHorizontal : 15,
        marginBottom : 10,
        borderRadius : 10,
        paddingVertical : 5
    },

    titleContainer : {
        flex : 1,
        flexDirection : "row",
        flexWrap : "wrap",
        paddingLeft : 20,
    },

    title : {
        fontSize : 15
    },

    matchesContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "row"
    },

    matches : {
        fontStyle : "italic",
        fontSize : 15
    }
})


export default RecipeResult;

