import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, ScrollView, View, Image, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../types';
import { getDatabase, ref, set } from "firebase/database";

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const Chat: React.FC<ChatScreenProps> = (props) => {
    
    return (<><Text>Hello</Text></>)
}