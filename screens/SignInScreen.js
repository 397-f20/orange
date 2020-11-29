import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Form from '../components/expo-form-starter'
import * as Yup from 'yup';
import { firebase } from "../firebase";
import React, { useState } from 'react';
import { Button } from 'react-native-paper'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Please enter a valid email')
        .email()
        .label('Email'),
    password: Yup.string()
        .required()
        .min(6, 'Password must have at least 6 characters')
        .label('Password'),
    confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
});


const LOGIN = 'LOGIN'
const SIGN_UP = 'SIGN_UP'

const SignInScreen = ({ navigation }) => {
    const [signInError, setSignInError] = useState('')
    const [mode, setMode] = useState(LOGIN)

    const changeMode = () => {
        if (mode === LOGIN) {
            setMode(SIGN_UP)
        } else {
            setMode(LOGIN)
        }
    }

    const handleOnSubmit = async (values) => {
        if (mode === SIGN_UP) {
            await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
        } else {
            await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
        }
        navigation.navigate('TemplateScreen', {})
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Form
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleOnSubmit}
                >
                    <Form.Field
                        name="email"
                        leftIcon="email"
                        placeholder="Enter email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                    />
                    <Form.Field
                        name="password"
                        leftIcon="lock"
                        placeholder="Enter password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                    />
                    {mode === SIGN_UP && (
                        <Form.Field
                            name="confirm"
                            leftIcon="lock"
                            placeholder="Confirm password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType="password"
                        />)}
                    <Form.Button title={mode === LOGIN ? 'Log In' : 'Sign Up'} />
                    {<Form.ErrorMessage error={signInError} visible={true} />}
                </Form>
                <Button mode='text' onPress={changeMode}>{`${mode === LOGIN ? "Don't have an account? Sign up here" : "Return to login"}`}</Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 28,
    }
});

export default SignInScreen;
