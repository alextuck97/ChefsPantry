import React from 'react';
import {Text, View} from 'react-native';



const Ingredient = ({ style, name }) => {
   
    return(
        <View style={style.ingredientBox}>
            <Text style={style.ingredientText}>{name}</Text>
        </View>
    )
    
}



export default Ingredient;