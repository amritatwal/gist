import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native'
import { RootStackParamList } from '../../types';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase/config';
import { ref, set, getDatabase } from 'firebase/database';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUp: React.FC<SignUpScreenProps> = (props) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("frankie lampard")
    // Initialize Cloud Firestore and get a reference to the service
    const db = getDatabase();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                updateProfile(user, {
                    displayName: name
                });
                const displayName: string = name;
                const uid: string = user.uid;
                const profilePhoto: string | null = user.photoURL;
                writeUserData(uid, displayName, profilePhoto);
                props.navigation.navigate("Home")
            }
        })
    }, [])


    // Write user's data to /users 
    function writeUserData(uid: string, displayName: string, profilePhoto: string | null) {
        try {
            set(ref(db, 'users/' + uid), {
                name: displayName,
                user_id: uid,
                profile_picture: profilePhoto ? profilePhoto : false,
                contacts: false,
                chats: false
            })
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }

        // TODO: writeChatData, writeMessageData
    }

    /**
     * Upon clicking relevant button, sign up user given their email and a valid password that fulfills criteria. 
     * TODO: ensure inputted passwords are secure
     * TODO: password confirmation
     */
    async function handleSignUp() {
        try {
            // Initialize Firebase Authentication and get a reference to the service
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    async function handleGoogleLogin() {
        await signInWithPopup(auth, provider)
    }

    return (
        <View>
            <TextInput
                placeholder="Full Name"
                onChangeText={text => setName(text)}
                value={name}
            />
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
            <Button title={"Let's go!"} onPress={handleSignUp} />
            <Button title={"Sign in with Google"} onPress={handleGoogleLogin} />
        </View>
    );
};
