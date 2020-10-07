import React from 'react';
import { View, StyleSheet, SafeAreaView, Button } from 'react-native';
import templates from '../templates'

const TemplateScreen = () => {
    return (
        <SafeAreaView>
            {templates.map((template) => <Button title={template.name} />)}
        </SafeAreaView>
    )
}

export default TemplateScreen;
