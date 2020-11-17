import React from 'react'
import { Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import Form from '../components/expo-form-starter'

const AddCategoryScreen = ({ route }) => {
    const { addCategory } = route.params
    const handleSubmit = (values) => {
        const category = { addedCourses: [], name: values.name, total: parseInt(values.total) }
        addCategory(category)
    }

    return (
        <SafeAreaView style={styles.addCategoryContainer}>
            <ScrollView>
                <Form
                    initialValues={{
                        name: "",
                        total: 1,
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Text>Name of Category</Text>
                    <Form.Field
                        name='name'
                        label={"Name of Category"}
                        placeholder='Untitled'
                    />
                    <Text># of Courses in the Category</Text>
                    <Form.Field
                        name='total'
                        placeholder='1'
                        autoFocus={true}
                    />
                    <Form.Button title={'Add Category'} />
                </Form>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addCategoryContainer: {
        margin: 20
    }
})

export default AddCategoryScreen;