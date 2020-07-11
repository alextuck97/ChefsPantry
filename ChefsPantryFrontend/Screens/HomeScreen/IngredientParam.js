import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IngredientParam = ({style, name, removeIngredient}) => {

    return (

        <View style={ingredientStyles.container}>
            <Text style={ingredientStyles.text}>{name}</Text>
            
            <Button color="#e64c35" title={"X"} 
                    onPress={()=>removeIngredient(name)}
            />
            
            
        </View>

    )

}

const ingredientStyles = StyleSheet.create({

    container : {
        
        flexDirection : "row",
        marginTop : 5,
        margin : 10,
        backgroundColor : "lightgray",
        borderRadius : 20
    },

    text : {
        margin : 10
    },

    
})

export default IngredientParam;