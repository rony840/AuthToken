import { StyleSheet, Image, Pressable } from "react-native";
import Colors from "../assets/colors/Colors"; // Assuming you have a colors file for transparency

// Create a dictionary for icon paths
const iconPaths = {
  profile: require("../assets/icons/profile.png"),
  // Add more icons as needed
};

const IconButton = ({ type, onPress, opacity = true }) => {
  // Get the icon path from the dictionary, or fallback to a default icon if not found
  const iconSource = iconPaths[type] || require("../assets/icons/profile.png");

  return (
    <Pressable
      style={({ pressed }) => [
        opacity ? styles.iconContainer1 : styles.iconContainer2,
        pressed && styles.iconPressed,  // Apply scale effect on press
      ]}
      onPress={onPress}
    >
      <Image style={styles.icon1}
      source={iconSource} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon1: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    tintColor: Colors.white,
    zIndex: 1,
  },
  iconContainer1: {
    height: 45,
    width: 45,
    padding: 5,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  iconContainer2: {
    height: 45,
    width: 45,
    padding: 5,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: Colors.transparent, // Transparent background
    alignItems: 'center',
  },
  iconPressed: {
    backgroundColor: Colors.iconPressed,  // Slightly scale down the button when pressed
  },
});

export default IconButton;
