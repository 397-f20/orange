import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-paper';

import templates from '../templates'

const TemplateScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            {
                templates.map((template, i) => (
                    <Button
                        key={i}
                        onPress={() =>
                            navigation.navigate("HomeScreen", { template })}
                    >
                        <Text>{template.name}</Text>
                    </Button>))
            }
        </SafeAreaView>
    )
}

export default TemplateScreen;
