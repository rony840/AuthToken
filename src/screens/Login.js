import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { getUserInfo, login, logout } from "../services/UserAPI";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async () => {
        console.log('values in login screen', email, password)
        const res = await login(email,password);
        console.log('response in login screen: ',res);
    }
    const getUser = async () => {
        console.log('values in login screen', email, password)
        const res = await getUserInfo();
        console.log('response in login screen: ',res);
    }
    const logoutUser = async () => {
        console.log('values in login screen', email, password)
        const res = await logout();
        console.log('response in login screen: ',res);
    }

    return(<View style={{flex:1, padding:20}}>
        <TextInput placeholder="Email" onChangeText={setEmail} style={{height:70,borderWidth:2, borderColor:'black'}}/>
        <TextInput placeholder="Password" onChangeText={setPassword} style={{height:70,borderWidth:2, borderColor:'black'}}/>
        <Button title="Login" onPress={handleLogin} style={{height:70,borderWidth:2, borderColor:'black'}} />
        <Button title="Get User Info" onPress={getUser} style={{height:70,borderWidth:2, borderColor:'black'}} />
        <Button title="logout user" onPress={logoutUser} style={{height:70,borderWidth:2, borderColor:'black'}} />
    </View>);
};

export default Login;