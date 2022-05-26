import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { RootStackParamList } from '../../types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth, provider } from '../firebase/config';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;


export const Welcome: React.FC<WelcomeScreenProps> = (props) => {
  return (
    <KeyboardAvoidingView>
      <Button
        title="Get started"
        onPress={() =>
          props.navigation.push("SignUp")
        }
      />
      <Button
        title="I already have an account"
        onPress={() =>
          props.navigation.push("Login")
        }
      />
    </KeyboardAvoidingView>
  );
};

