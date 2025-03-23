import { StyleSheet, SafeAreaView, View, ScrollView, Image, Text, Alert } from 'react-native';
import { FormButton, FormField, Background, FormFooter } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../assets/colors/Colors';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'; 
import { enableGuest, loginUser, loginUserFailed, loginUserSuccess, loginWithToken } from '../store/slices/userSlice';
import { LoginSchema } from '../schemas/LoginSchema';
import Config from 'react-native-config';
import { useLoginMutation } from '../services/rtkQuery/userAPISlice';
import { useEffect } from 'react';
import { Linking } from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); 
  const { loading, error, user } = useSelector((state) => state.user);
  const [login, { isLoading, error: rtkError }] = useLoginMutation();

  console.log('EnvSelected: ', Config.ENV);

  const extractParams = (url) => {
    try {
      const queryString = url.split("?")[1];
      if (!queryString) return {};
      return queryString.split("&").reduce((acc, param) => {
        const [key, value] = param.split("=");
        acc[key] = value ? decodeURIComponent(value) : "";
        return acc;
      }, {});
    } catch (error) {
      console.error("Error Parsing URL:", error);
      return {};
    }
  };

  const handleDeepLink = (url) => {
    if (!url) return;
    const params = extractParams(url);
    if (params.token) {
      dispatch(loginWithToken(params.token));
    } else {
      console.log("Token not found in deep link");
    }
  };
  
  useEffect(() => {
    const initDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) handleDeepLink(url);
    };
    initDeepLink();
    const deepLinkListener = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });
    return () => {
      console.log("Cleaning up deep link listener on login.");
      deepLinkListener.remove();
    };
  }, []);

  const handleLogin = async (values) => {
    if (Config.ENV === 'Staging') {
      console.log('attempting login using RTK query');
      try {
        const result = await login(values).unwrap();
        console.log('Login successful:', result.message);
        Alert.alert('Logged In', result.message);
        dispatch(loginUserSuccess(result.message));
      } catch (error) {
        console.error('RTK Query Login Error:', error.error);
        dispatch(loginUserFailed(error.error));
      }
    } else if (Config.ENV === 'Development') {
      try {
        console.log('attempting login using redux-saga with axios');
        dispatch(loginUser(values));
      } catch (error) {
        console.error('Redux-saga with axios login Error:', error.data.message);
      }
    }
  };

  const gotoGuest = () => {
    dispatch(enableGuest());
  };

  const initialValues = loading
    ? { email: '', password: '' }
    : { email: user?.email || '', password: user?.password || '' };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <Image source={require('../assets/icons/restfulapi.png')} style={styles.logo} />
            <Text style={styles.envText}>Environment: {Config.ENV}</Text>
            <Text style={styles.companyName}>Restful API</Text>
            <Text style={styles.heading}>Login</Text>
          </View>
          <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
            {({ handleChange, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <FormField
                  title={'Email'}
                  placeholder={'john@example.com'}
                  onChange={handleChange('email')}
                  initValue={values.email}
                  error={errors.email}
                />
                <FormField
                  title={'Password'}
                  placeholder={'* * * * * * *'}
                  onChange={handleChange('password')}
                  secure={true}
                  initValue={values.password}
                  error={errors.password}
                />
                {(error || rtkError) && <Text style={styles.errorText}>{error || rtkError?.data?.message}</Text>}
                <FormButton title={'Login'} onPress={handleSubmit} disabled={loading || isLoading} />
                <FormButton title={'Guest User'} onPress={gotoGuest} disabled={loading} />
              </View>
            )}
          </Formik>
        </ScrollView>
        <FormFooter title1={"Don't have an account?"} title2={'SignUp'} onPress={() => navigation.replace('Signup')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 120,
  },
  envText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
