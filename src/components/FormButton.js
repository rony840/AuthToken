import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../assets/colors/Colors";

const FormButton = props =>{
    const {btStyle,title,btTxt,onPress} = props;
    return(
        <TouchableOpacity
            onPress={onPress}>
            <View style={{...styles.btn,...btStyle}}>
            <Text style={{...styles.btnText,...btTxt}}>{title||"Button Name"}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        flexDirection:'row',
        justifyContent: 'center',
        height:60,
        width:150,
        borderRadius:10,
        backgroundColor: Colors.formButtonBG,
        marginBottom: 20
    },
    btnText: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf:'center',
        color: Colors.formButtonTxt,
    },
});

export default FormButton;