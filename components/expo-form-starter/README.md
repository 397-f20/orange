This is starter code for simple React Native forms, using Formik and Yup.

It is adapted from 
[expo-community-firebase-starter](https://github.com/expo-community/expo-firebase-starter).
The main change was the addition of a **Form** wrapper so that only one component needs to be imported,
and a **FormSwitch** toggle component.

# Installation

To use, install Formik and Yup into your project.

```
expo install formik yup
```

Put all the source files into your components directory.

# Example

Here's the form part of [LoginScreen](https://github.com/expo-community/expo-firebase-starter/blob/master/screens/LoginScreen.js) from expo-community-starter, as it would be implemented with **Form**. 
Event handling, Yup validation, styles, and so on, are omitted. Icon
names in the text fields are [MaterialCommunityIcons](https://icons.expo.fyi/) provided by Expo.

```
...
import Form from '../components/Form';
...

export default function LoginScreen({ navigation }) {
  ...
  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnLogin(values)}
      >
        <Form.Field
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <Form.Field
          name="password"
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <Form.Button title={'Login'} />
        {<Form.ErrorMessage error={loginError} visible={true} />}
      </Form>
      ...
    </SafeView>
  );
}
```