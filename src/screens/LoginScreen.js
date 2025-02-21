import { StyleSheet, SafeAreaView, View, ScrollView, Image, Text } from 'react-native';
import { FormButton, FormField, Background, FormFooter } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../assets/colors/Colors';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'; 
import { loginUser } from '../store/slices/userSlice';
import { LoginSchema } from '../schemas/LoginSchema';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize dispatch
  const { loading, error, user } = useSelector((state) => state.user); // Access loading and error states from the Redux store
  
  // Handle login
  const handleLogin = (values) => {
    //console.log('values in handle login screen: ', values);
    dispatch(loginUser(values));
  };

  // Conditionally set initialValues based on the loading state
  const initialValues = loading ? { email: '', password: '' } : { 
    email: user?.email || '', 
    password: user?.password || '' 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Component */}
      <Background />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <Image 
              source={require('../assets/icons/restfulapi.png')} 
              style={styles.logo}
            />
            <Text style={styles.companyName}>Restful API</Text>
            <Text style={styles.heading}>Login</Text>
          </View>
          <Formik
            initialValues={initialValues} // Use the dynamically set initial values
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <FormField
                  title={'Email'}
                  placeholder={'john@example.com'}
                  onChange={handleChange('email')}
                  value1={values.email}
                  error={errors.email} 
                />
                <FormField
                  title={'Password'}
                  placeholder={'* * * * * * *'}
                  onChange={handleChange('password')}
                  secure={true}
                  value1={values.password}
                  error={errors.password}
                />
                {/* Show error message from Redux state */}
                {error && <Text style={styles.errorText}>{error}</Text>}
                <FormButton title={'Login'} onPress={handleSubmit} disabled={loading} />
              </View>
            )}
          </Formik>
        </ScrollView>
        {/* Footer */}
        <FormFooter title1={"Don't have an account?"} title2={"SignUp"} onPress={() => navigation.replace('Signup')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 120,
  },
  logo: {
    width: 150,
    height: 150,
    tintColor: Colors.logoColor1,
  },
  companyName: {
    color: Colors.companyName,
    fontWeight: '500',
    fontSize: 30,
  },
  heading: {
    marginTop: '5%',
    fontWeight: '800',
    color: Colors.headingColor1,
    fontSize: 45,
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
  formContainer: {
    flex: 1,
    marginTop: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginScreen;
