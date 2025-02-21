import { StyleSheet, SafeAreaView, View} from 'react-native';
import { Background, FormButton } from '../components/Components';
import { useDispatch, useSelector } from 'react-redux';
import TextDisplay from '../components/TextDisplay';
import { fetchUser } from '../store/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch(); 
  const {currentUser} = useSelector((state) => state.user);
  
  const fetchUserInfo = () => {
    dispatch(fetchUser())
  }
  return (
    <SafeAreaView style={styles.container}>
     
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <TextDisplay txt={currentUser? `User Id: ${currentUser.id}`:"Id: No Data"}/>
          <TextDisplay txt={currentUser? `Name: ${currentUser.name}`:"Name: No Data"}/>
          <TextDisplay txt={currentUser? `Email: ${currentUser.email}`:"Email: No Data"}/>
          <View style={styles.btnContainer}>
            <FormButton onPress={fetchUserInfo} title={"Fetch User Info"}/>
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
    marginTop: '5%',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: '15%',
    alignItems: 'center',
  },
});

export default Profile;
