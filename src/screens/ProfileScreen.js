import { StyleSheet, SafeAreaView, View, ActivityIndicator, Linking} from 'react-native';
import { Background, FormButton } from '../components/Components';
import { useDispatch, useSelector } from 'react-redux';
import TextDisplay from '../components/TextDisplay';
import { fetchUser, fetchUserFailed, fetchUserSuccess } from '../store/slices/userSlice';
import Config from 'react-native-config';
import { useLazyGetUserInfoQuery } from '../services/rtkQuery/userAPISlice';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const dispatch = useDispatch(); 
  const {currentUser} = useSelector((state) => state.user);
  const [getUserInfo,  {isLoading, isFetching, status, error} ] = useLazyGetUserInfoQuery();
  const navigation = useNavigation();
  
  useEffect(() => {
      const navigateIfNeeded = async () => {
          const url = await Linking.getInitialURL();
          if (url && url.includes("redirect=goals")) {
            navigation.navigate("Goals", { deepLinked: true });
          }
      };
      navigateIfNeeded();
    }, []);

  const fetchUserInfo = async() => {
    if (Config.ENV === 'Staging') {
          try {
            console.log('attempting fetch user info using RTK query')
            console.log('Fetching Status:', { isLoading, isFetching, status });
            const res = await getUserInfo();
            dispatch(fetchUserSuccess(res.data.data))
            if (!isFetching) {
              console.log('Using Cached Data:', res);
            }
          } catch {
            console.error('RTK Query fetch user info Error:', error.data.message);
            dispatch(fetchUserFailed(error?.data?.message))
          }
        } else if(Config.ENV === 'Development'){
          try{
            console.log('attempting fetch user info using redux-saga with axios')
            dispatch(fetchUser());
          }catch(error){
            console.error('Redux-saga with axios fetch user info Error:', error.data.message);
          }
        }
  }
  return (
    <SafeAreaView style={styles.container}>
     
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
        
         { isLoading? (
          <>
          <ActivityIndicator color={'white'} size={'large'}/>
         </>) : (
          <>
            <TextDisplay txt={currentUser? `User Id: ${currentUser.id}`:"Id: No Data"}/>
            <TextDisplay txt={currentUser? `Name: ${currentUser.name}`:"Name: No Data"}/>
            <TextDisplay txt={currentUser? `Email: ${currentUser.email}`:"Email: No Data"}/>
            <View style={styles.btnContainer}>
              <FormButton onPress={fetchUserInfo} title={"Fetch User Info"}/>
            </View>
          </>
          )}
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
