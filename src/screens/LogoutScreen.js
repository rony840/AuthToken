import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Background, TextDisplay, FormButton } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const LogoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Function to handle logout
  const handleLogout = async () => {
    try {

      dispatch(logoutUser());

    } catch (error) {
      console.error('Error logging out:', error);
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
