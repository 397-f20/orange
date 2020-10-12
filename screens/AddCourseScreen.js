import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Form from '../components/expo-form-starter'
import { Searchbar } from 'react-native-paper';
const AddCourseScreen = ({route}) => {
    // const { addCategory } = route.params
    // const handleSubmit = (values) => {
    //     const category = {addedCourses: [], ...values}
    //     addCategory(category)
    // }
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <View>
            <ScrollView>
                <Form
                    initialValues={{
                        name: "COMP_SCI 397",
                        category: "Unallocated"
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Text>Course Name</Text>
                  <Searchbar 
                    placeholder="Search course"
                    onChangeText={setSearchQuery()}
                  />
                  {/*<Form.Field
                        name='name'
                        placeholder='Course name'
                        autoFocus={true}
                    />
                    <Text>Name of Category</Text>
                    <Form.Field
                        name='category'
                        label={"Name of Category"}
                        placeholder='Untitled'
                    />*/}
                    <Form.Button title={'Update'}/>
                </Form>
            </ScrollView>
        </View>
    )
}

export default AddCourseScreen;
