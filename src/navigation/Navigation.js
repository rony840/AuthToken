import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Logout, Login, Signup, Profile, Goals, Apollo} from '../screens/Screens';
import { Image, SafeAreaView } from 'react-native';
import Heading from '../components/Heading';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();

// auth stack
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

//user stack
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoggedIn" component={DrawerTab} />
    </Stack.Navigator>
  );
};

// Tab Navigator for Welcome and Main screens (Static Flow)
const Tab = createBottomTabNavigator();

// Tabs for Profile and Transactions
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/profile.png')} // Path to your icon
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'black' : 'gray', // Change color based on focus
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={Goals}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/transaction.png')} // Path to your icon
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'black' : 'gray', // Change color based on focus
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigation
const Drawer = createDrawerNavigator();

function DrawerTab() {
  const user = useSelector((state) => state.user.user); // Fetch user data from Redux state
  const { name1 } = user || {}; // Destructure firstName and lastName
  
  return (
    <Drawer.Navigator
      screenOptions={{
        
        headerBackground:'red',
        header: ({ route }) => {
          // Dynamically change the header based on the screen name
          const { name } = route;
          let headingText = '';
          let iconClickEnabled = true;

          if (name === 'User') {
            headingText = 'Profile';
          } else if (name === 'Logout') {
            headingText = 'Logout';
            iconClickEnabled = false; // Disable icon click on Edit Profile screen
          }

          return (
            <SafeAreaView>
              <Heading
                heading={headingText}
                type={'Profile'}
                name={name1}
                iconClickEnabled={iconClickEnabled}
              />
            </SafeAreaView>
          );
        },
      }}
    >
      <Drawer.Screen name="User" component={MyTabs} />
      <Drawer.Screen name="Logout" component={Apollo} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}


// App Navigation Component
const AppNavigation = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (isAuthenticated? <UserStack/> : <AuthStack/>)
};

export default AppNavigation;
