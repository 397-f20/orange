import React from 'react';
import { View, StyleSheet, SafeAreaView, Button } from 'react-native';
import templates from '../templates'

const TemplateScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            {templates.map((template, i) => 
            <Button title={template.name} 
            onPress={() => 
            navigation.navigate("HomeScreen", {template})} 
            key={i}
            />)}
        </SafeAreaView>
    )
}

export default TemplateScreen;
