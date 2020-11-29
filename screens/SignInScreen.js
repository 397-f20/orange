import * as Yup from 'yup';

import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import { Button } from 'react-native-paper';
import Form from '../components/expo-form-starter';
import { firebase } from '../firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter a valid email').email().label('Email'),
  password: Yup.string().required().min(6, 'Password must have at least 6 characters').label('Password'),
  confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
});

const LOGIN = 'LOGIN'
const SIGN_UP = 'SIGN_UP'

const SignInScreen = ({ navigation }) => {

    // if the user is logged in, move them to the next screen
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            navigation.navigate('TemplateScreen', {})
        }
    })

    const [signInError, setSignInError] = useState('')
    const [mode, setMode] = useState(LOGIN)

  const changeMode = () => {
    if (mode === LOGIN) {
      setMode(SIGN_UP);
    } else {
      setMode(LOGIN);
    }
  };

    const handleOnSubmit = async (values) => {
        if (mode === SIGN_UP) {
            const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
        } else {
            const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
        }
        navigation.navigate('TemplateScreen', {})
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image 
          source={require('../resources/CatTracksLogo.png')} 
          style={styles.imageStyle}
          resizeMode="contain"/>
        </View>
        <View style={styles.form}>
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
              name='email'
              leftIcon='email'
              placeholder='Enter email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
            />
            <Form.Field
              name='password'
              leftIcon='lock'
              placeholder='Enter password'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={true}
              textContentType='password'
            />
            {mode === SIGN_UP && (
              <Form.Field
                name='confirm'
                leftIcon='lock'
                placeholder='Confirm password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
              />
            )}
            <Form.Button style={styles.primaryButton} title={mode === LOGIN ? 'Log In' : 'Sign Up'} />
            {<Form.ErrorMessage error={signInError} visible={true} />}
          </Form>
          <Button mode='text' onPress={changeMode} style={styles.secondaryButton}>
            {`${mode === LOGIN ? "Don't have an account? Sign up here" : 'Return to login'}`}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  primaryButton: {
    marginVertical: 20,
    width: '100%',
  },
  secondaryButton: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: '35%',
    opacity: 1,
  },
});

export default SignInScreen;
