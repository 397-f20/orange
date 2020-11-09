import React from 'react'
import { Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import Form from '../components/expo-form-starter'

const AddCategoryScreen = ({ route }) => {
    const { addCategory } = route.params
    const handleSubmit = (values) => {
        const category = { addedCourses: [], ...values }
        addCategory(category)
    }

    return (
        <SafeAreaView style={styles.addCategoryContainer}>
            <ScrollView>
                <Form
                    initialValues={{
                        total: 1,
                        name: "",
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Text># of Courses in the Category</Text>
                    <Form.Field
                        name='total'
                        placeholder='1'
                        autoFocus={true}
                    />
                    <Text>Name of Category</Text>
                    <Form.Field
                        name='name'
                        label={"Name of Category"}
                        placeholder='Untitled'
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