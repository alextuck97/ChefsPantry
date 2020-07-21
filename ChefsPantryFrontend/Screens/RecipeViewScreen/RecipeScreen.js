import React, { useState } from 'react';
import {Text, 
        ScrollView, 
        SafeAreaView,
        FlatList,
        StatusBar,
        StyleSheet, 
        Button,
        View,
        Linking,
        Pressable} from 'react-native';

import Ingredient from './Ingredient';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const test_recipe = {
    site_title : "The Wholesome Dish",
    url : "https://www.thewholesomedish.com/creamy-crock-pot-pork-chops-potatoes-onions/",
    recipe : {
        title : "Creamy Crock Pot Pork Chops Potatoes & Onions",
        description : "Creamy Crock Pot Pork Chops Potatoes & Onions is an easy comfort food dinner that only takes a few ingredients and a few minutes to prepare.  These slow cooker pork chops are a hit!",
        minutes : "18",
        hours : "0",
        ingredients : ["yellow onion",
                    "red potatoes",
                    "boneless pork chops",
                    "cream of mushroom soup",
                    "dry ranch dressing mix",
                    "ground black pepper",
                    "olive oil"]
    }
}


const ListHeader = (recipe, sitetitle, url) => {
    
    const {title, description, minutes, hours} = recipe;
    return (
        <View>
            <Text style={pageStyles.title}>{title}</Text>
            {hours === undefined && minutes == undefined ? null : 
                <Text style={pageStyles.time}>{hours} hr {minutes} min</Text>
            }
            <Text style={pageStyles.source_site}>From {sitetitle}</Text>
            
            <Description style={pageStyles.description} description={description}/>
            
            {url === undefined ? null : 
                <View style={pageStyles.buttonContainer}>
                    <Button color="#e64c35" style={pageStyles.button}
                            title="Get the recipe here!"
                            onPress={ () => { Linking.openURL(url)}} 
                    />
                </View>
            }
            
        </View>
    )
}


const Description = ({style, description}) => {

    const [showFullDescription, setShowFullDescription] = useState(false);
   
    return (
        <Pressable onPress={() => setShowFullDescription((current) => current ^ true)}>
            <Text style={style}>
                {showFullDescription ? description : (description.substr(0,50) + "...")}
            </Text>
        </Pressable>
    )

}


const RecipeScreen = ({route, navigation}) => {

    const { recipeObject } = route.params;

    const { sitetitle, url, recipe } = recipeObject;
    const {ingredients} = recipe;
   

    const renderIngredient = ({item, index}) => {
        return(
            <Ingredient style={ingredientStyles} name={item} />
        )   
    }

    return (
        <SafeAreaView style={{flex : 1}}>
            <FlatList ListHeaderComponent={ListHeader(recipe, sitetitle, url)} 
                data={ingredients}
                renderItem={renderIngredient}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
        
    );  
}





//Styles for stuff defined on this page, like buttons and text
const pageStyles = StyleSheet.create({
    title : {
        textAlign : "center",
        fontWeight : "bold",
        fontSize : 25,
        marginTop : 5
    },

    time : {
        textAlign : "center",
        fontSize : 20
    },

    source_site : {
        textAlign : "center",
        fontSize : 15,
        marginTop : 5
    },

    description : {
        fontSize : 20,
        marginHorizontal : 20,
        marginTop : 5,
        textAlign : "left"
    },

    buttonContainer : {
        marginTop : 10,
        marginHorizontal : 20,
        marginBottom : 10,
        justifyContent : "center",
        alignItems : "center"
    }
})

//Styles for the ingredient component
const ingredientStyles = StyleSheet.create({
    ingredientBox : {
        marginVertical : 5,
        marginHorizontal : 20,
        backgroundColor : "#f2eea2",
        borderColor : "#aba987",
        borderWidth : 1,
        borderRadius : 5,
        fontSize : 20
    },

    ingredientText : {
        fontSize : 20,
        marginLeft : 10
    }
})

export default RecipeScreen;