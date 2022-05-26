import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../types';
import { auth } from '../firebase/config';
import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


export const Home: React.FC<HomeScreenProps> = (props) => {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getDatabase();
  const [contact, setContact] = useState<string>("");

  /*
  TODO:
  Profile photo is obtained if user has signed in through Google (and that they have a photo). 
  Need to be able to allow user to upload their own photo if signed in through email / password, or should they want to update it.
  */

  // TODO:
  // Add a contact to /chats list to create a new chat between two contacts (in future, after MVP, add functionality to create group chats)

  function handleNewChat() {
    // UI: pop-up/modal? user is prompted to either add a new contact or create a new group (after MVP)
    // Adding a new contact to create a chat entails: retrieving the contact's name (in order to provide a name when creating/displaying a user's contact list), a phone number or email (MVP)...
    function writeChatData(currentUser, contact) {
      console.log(currentUser)
      // TODO: 
      // Check a chat between two contacts doesn't already exist otherwise it'll create duplicate chats!
      try {
        const chatUUID = uuidv4().toString();
        set(ref(db, 'chats/' + chatUUID), {
          lastMessage: null,
          timestamp: null
        });
        set(ref(db, 'users/' + currentUser + '/chats'), {
          [chatUUID]: true
        }
        )
        set(ref(db, 'members/' + chatUUID), {
          [currentUser]: true,
          [contact]: true
        })
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    writeChatData(auth.currentUser.uid, contact);
  }


  function handleSignOut() {
    auth.signOut();
    props.navigation.replace("Welcome")
  }

  return (
    <>
      <View>
        <Text>Messages</Text>
        <Button title={"Sign out"} onPress={handleSignOut} />
        <TextInput
          placeholder="Contact to add"
          onChangeText={text => setContact(text)}
          value={contact}
        />
        <Button title={"Create a chat"} onPress={handleNewChat} />
        <Text>contacts go here</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userPhoto: {
    width: 50,
    height: 50,
  }
});