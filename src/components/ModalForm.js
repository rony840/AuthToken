import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../assets/colors/Colors";

const ModalForm = (props) => {
    const {title, onChange, placeholder, initValue, error, modalVisible, onReqClose, onClose, onSubmit} = props;
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onReqClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* close icon button */}
          <TouchableOpacity
                onPress={onClose}>
                <View style={styles.icnCont}>
                <Image style={styles.icnBtn} source={require('../assets/icons/close.png')}/>
                </View>
            </TouchableOpacity>

            {/* Input Field */}
            <View style={styles.container}>
                <View style={styles.txtCont}>
                    <Text style={{...styles.frmLabel}}>{title||"Enter a Label"}</Text>
                    <Text style={{...styles.frmErr}}>{error}</Text>
                </View>
                <TextInput
                    value={initValue}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    onChangeText={onChange}
                    placeholder={placeholder||"Enter your placeholder"}
                    placeholderTextColor={Colors.formPlaceholder}
                    style={{...styles.txtInput}}
                    />

                {/* Submit button */}
                <TouchableOpacity
                    onPress={onSubmit}>
                    <View style={styles.btn}>
                    <Text style={styles.btnText}>{title||"Button Name"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        height:'40%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    container:{
        backgroundColor:Colors.formFieldBG,
        borderRadius:20,
        padding:10,
        height: 100,
        Width:100,
        marginBottom: 20,
        alignItems:'center'

    },
    txtCont:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    frmLabel:{
        fontSize: 16,
        fontWeight: '600',
        color: Colors.formLabel,
        marginLeft: 15,
    },
    txtInput:{
        height: 50,
        width: 250,
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 20,
        fontWeight: '800',
        color: Colors.formInputTxt,
        borderBottomWidth:1,
        borderBottomColor: Colors.formInputBorder,
    },
    frmErr:{
        fontSize: 14,
        fontWeight: '400',
        color: Colors.formInputError,
        marginLeft: 10,
    },
    icnBtn: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        tintColor: 'white',
        zIndex: 1,
    },
    icnCont: {
        position:'relative',
        top:'-45%',
        right: '-45%',

        height: 40,
        width: 40,
        padding: 5,
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: 'black',
        alignItems: 'center',
    },
    btn: {

        flexDirection:'row',
        justifyContent: 'center',
        height:60,
        width:150,
        borderRadius:10,
        backgroundColor: Colors.formButtonBG,
        marginTop: '20%'
    },
    btnText: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf:'center',
        color: Colors.formButtonTxt,
    },
});

export default ModalForm;