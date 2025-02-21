import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FormButton, FormField, Background, FormFooter, Heading } from '../components/Components';
import { signupUser } from '../store/slices/userSlice';
import { SignupSchema } from '../schemas/SignupSchema';

const SignupScreen = () => {
  const dispatch = useDispatch(); 
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { signedup } = useSelector((state) => state.user);

  useEffect(() => {
      if (signedup) {
        Alert.alert('User profile created!')
        navigation.replace('Login');
      }
    }, [signedup, navigation]);

  const handlerSignupUser = (values) => {
    try {
      const { name, email, password } = values;
      const userData = {
        name,
        email,
        password,
      };
      console.log('data in signup screen: ',userData)
      dispatch(signupUser(userData));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Background />
      <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
        
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
          <Heading showWalletIcon={true} heading={'Signup User'} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          
          <Formik
            initialValues={initialValues}  
            validationSchema={SignupSchema}
            onSubmit={handlerSignupUser}
            enableReinitialize={true}
          >
            {({ handleChange, handleSubmit, errors}) => (
              <View style={styles.formContainer}>
                <FormField
                  title={'Name'}
                  placeholder={'johndoe678'}
                  onChange={handleChange('name')}
                  error={errors.name}
                />
                <FormField
                  title={'Email'}
                  placeholder={'johndoe@example.com'}
                  onChange={handleChange('email')}
                  error={errors.email} 
                />
                <FormField
                  title={'Password'}
                  placeholder={'*******'}
                  onChange={handleChange('password')}
                  error={errors.password}
                  secure={true} 
                />
                <FormButton title={'Sign Up'} onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
        <FormFooter title1={"Already have an account?"} title2={"Login"} onPress={() => navigation.replace('Login')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    zIndex: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default SignupScreen;
