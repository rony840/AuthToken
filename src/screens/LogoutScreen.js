import { StyleSheet, SafeAreaView, View, Alert, Linking } from 'react-native';
import { Background, TextDisplay, FormButton } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutUser, logoutUserFailed, logoutUserSuccess } from '../store/slices/userSlice';
import Config from 'react-native-config';
import { useLogoutMutation } from '../services/rtkQuery/userAPISlice';
import { resetGoalStates } from '../store/slices/goalSlice';

const LogoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logout, { isLoading, error: rtkError }] = useLogoutMutation();

  const handleLogout = async () => {
    if (Config.ENV === 'Staging') {
        console.log('attempting login using RTK query')
        try {
          const result = await logout();
          
          console.log('Logout successful:', result.data);
          Alert.alert('Logged Out!',result.data)
          Linking.getInitialURL = async () => null;
          dispatch(resetGoalStates());
          dispatch(logoutUserSuccess(result));
        } catch (error) {
          console.error('RTK Query Logout Error:', error.data.message);
          dispatch(logoutUserFailed(error.data.message))
        }
      } else if(Config.ENV === 'Development'){
        try{
          console.log('attempting logout using redux-saga with axios')
          dispatch(logoutUser());
        }catch(error){
          console.error('Redux-saga with axios logout Error:', error.data.message);
        }
      }
      
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <TextDisplay txt={'Are you sure you want to log out?'} />
          <View style={styles.btnCont}>
            <FormButton title={'NO'} onPress={() => navigation.goBack()} />
            <FormButton title={'YES'} onPress={handleLogout} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make sure it's transparent to see the background
  },
  contentContainer: {
    position: 'absolute', // Position content above the background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between', // Ensures footer is at the bottom
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  bodyContainer: {
    flex: 1,
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCont: {
    marginTop: '20%',
  },
});

export default LogoutScreen;
