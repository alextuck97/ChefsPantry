import React from 'react';

import {Button} from 'react-native';

const HomeScreen = ({navigation}) => {

    return (
        <Button 
            title="Go to profile"
            onPress={() => 
                navigation.navigate('Recipe')
            }
        />
    )

}


export default HomeScreen;