import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native'
import { RootStackParamList } from '../../types';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../firebase/config';


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const Login: React.FC<LoginScreenProps> = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        auth.onAuthStateChanged(validUser => {
            if (validUser) {
                props.navigation.navigate("Home")
            }
        })
    }, [])

    /**
     * Upon clicking relevant button, login user given their email and valid password. 
     */
    async function handleLogin() {
        try {
            // Initialize Firebase Authentication and get a reference to the service
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log("Logged in user with the email " + userCredential.user.email)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    /**
     * Upon clicking relevant button, login user through Google authentication.
     * TODO: finish functionality
     */
    async function handleGoogleLogin() {
        await signInWithPopup(auth, provider)
    }
    
    return (
        <View>
            <TextInput
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Button title={"Let's go!"} onPress={handleLogin} />
            <Button title={"Sign in with Google"} onPress={handleGoogleLogin} />
        </View>
    );
};