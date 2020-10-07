import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import Form from '../components/expo-form-starter'

const AddCategoryScreen = ({route}) => {
    const { addCategory } = route.params
    const handleSubmit = (values) => {
        const category = {addedCourses: [], ...values}
        addCategory(category)
    }

    return (
        <View>
            <ScrollView>
                <Form
                    initialValues={{
                        total: 1,
                        name: "Untitled",
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
                    <Form.Button title={'Update'}/>
                </Form>
            </ScrollView>
        </View>
    )
}

export default AddCategoryScreen;
