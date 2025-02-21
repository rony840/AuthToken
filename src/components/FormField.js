import {View,Text,StyleSheet, TextInput} from 'react-native';
import { Colors } from '../assets/colors/Colors';

const FormField = props => {
    const {title,editable,onChange,placeholder,value1,error,secure} = props;
    return(
        <View style={styles.container}>
            <View style={styles.txtCont}>
                <Text style={{...styles.frmLabel}}>{title||"Enter a Label"}</Text>
                <Text style={{...styles.frmErr}}>{error}</Text>
            </View>
            
            <TextInput
              value={value1}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={onChange}
              placeholder={placeholder||"Enter your placeholder"}
              placeholderTextColor={Colors.formPlaceholder}
              secureTextEntry={secure}
              editable={editable}
              style={{...styles.txtInput}}
               />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.formFieldBG,
        borderRadius:20,
        padding:10,
        height: 100,
        Width:'100%',
        marginBottom: 20,

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
        width: 320,
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
});

export default FormField;