import React, {useEffect} from 'react'
import { Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import Form from '../components/expo-form-starter'
import * as Yup from "yup";
import { useFormikContext } from "formik";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Enter a name for the category')
        .label('Category Name'),
    total: Yup.number()
        .required()
        .min(0, 'Total must be < 0')
        .label('Total number of courses'),
});

const SubmitButton = () => {
    const vals  = useFormikContext();
    return (
        <Form.Button disabled={!(vals.isValid && vals.dirty) } title={'Add Category'} />
    )
}

const AddCategoryScreen = ({ route }) => {
    const { addCategory } = route.params
    const handleSubmit = (values) => {
      const category = { futureCourses: [], addedCourses: [], name: values.name, total: parseInt(values.total) }
        addCategory(category)
    }

    useEffect(() => {

    }, [])

    return (
        <SafeAreaView style={styles.addCategoryContainer}>
            <ScrollView>
                <Form
                    initialValues={{
                        name: "",
                        total: 1,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Text>Name of Category</Text>
                    <Form.Field
                        autoFocus={true}
                        name='name'
                        label={"Name of Category"}
                    />
                    <Text># of Courses in the Category</Text>
                    <Form.Field
                        name='total'
                    />
                    <SubmitButton/>
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
