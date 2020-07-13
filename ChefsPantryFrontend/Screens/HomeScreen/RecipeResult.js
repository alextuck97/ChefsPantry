import React from 'react';
import { View, 
        Pressable, 
        StyleSheet,
        Text } from 'react-native';
import { ceil } from 'react-native-reanimated';


const RecipeResult = ({recipeObject, matches, navigation}) => {

    const { sitetitle, recipe } = recipeObject;
    
    return (

        <Pressable onPress={() => navigation.navigate("Recipe", {recipeObject : recipeObject})}>
            <View style={style.container}>
                <View style={style.titleContainer}>
                    <Text style={style.title}>{recipe.title}</Text>
                </View>
                
                <View style={style.matchesContainer}>
                    <Text style={style.matches}>{matches} matches</Text>
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

