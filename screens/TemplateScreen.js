import { SafeAreaView, StyleSheet, Text } from "react-native";
import TemplateContext from "../TemplateContext";
import { Button } from "react-native-paper";
import React, {useContext} from "react";

const TemplateScreen = ({ navigation }) => {
  const templates = useContext(TemplateContext)
  return (
    <SafeAreaView style={styles.container}>
        {templates.map((template, i) => (
            <Button
                key={i}
                onPress={() =>
                    navigation.navigate("HomeStackScreen", {
                      screen: "HomeScreen",
                      params: { template }
                    })
                }
            >
              <Text>{template.name}</Text>
            </Button>
        ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  }
});

export default TemplateScreen;
