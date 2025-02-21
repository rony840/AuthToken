import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../assets/colors/Colors';
import { useNavigation } from '@react-navigation/native';

const iconPaths = {
  Profile: require("../assets/icons/profile.png"),
};

const Heading = (props) => {
  const navigation = useNavigation();
  const { name1, name2, type, heading, style2, iconClickEnabled, onIconPress } = props;
  const iconSource = iconPaths[type] || require("../assets/icons/restfulapi.png");

  const openDrawer = () => {
    if (iconClickEnabled) {
      navigation.openDrawer();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        {/* Left Side - Wallet and Network */}
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={openDrawer} // Only opens the drawer if iconClickEnabled is true
            disabled={!iconClickEnabled} // Disable the icon click if iconClickEnabled is false
          >
            <Image
              source={iconSource}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleSt}>{name1 || 'Restful API'}</Text>
          </View>
        </View>

        {/* Right Side - Heading */}
        <Text style={[styles.heading, style2]}>
          {heading || 'Add Heading'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.companyName,
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Align items vertically centered
    justifyContent: 'space-between', // Distribute space between left and right
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 70,
    width: '100%',
  },
  header: {
    flexDirection: 'row', // Horizontal layout for left and right sections
    alignItems: 'center', // Vertically align the items
    width: '100%',
    justifyContent: 'space-between', // Space out the left and right components
  },
  leftContainer: {
    flexDirection: 'row', // Horizontal alignment for image and titles
    alignItems: 'center', // Align the items vertically centered
  },
  titleContainer: {
    marginLeft: 10, // Space between the image and the titles
  },
  titleSt: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.appBackground,
    textAlign: 'left',
  },
  icon: {
    zIndex: 10, // Ensure the button is above other elements
    marginLeft: 10,
  },
  image: {
    width: 40,
    height: 40,
    tintColor: Colors.appBackground,
  },
  heading: {
    fontSize: 30, // Adjusted size to fit better on the right
    fontWeight: '500',
    color: Colors.appBackground,
    textAlign: 'right', // Align the heading text to the right
    flex: 1, // Take up remaining space on the right
    marginRight: 20,
  },
});

export default Heading;
