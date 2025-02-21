import { StyleSheet, Text } from "react-native";
import { Colors } from "../assets/colors/Colors";

const TextDisplay = (props) => {
    const {txt} = props;
    return(<Text style={styles.txtStyle}>{txt}</Text>);
}

const styles = StyleSheet.create({
    txtStyle:{
        textAlign:'center',
        fontSize: 20,
        color: Colors.companyName,
    }
})

export default TextDisplay;