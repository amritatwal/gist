import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../types';
import { auth } from '../firebase/config';
import { getDatabase, ref, set, push, child, get, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { database } from 'react-native-firebase';


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


export const Home: React.FC<HomeScreenProps> = (props) => {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getDatabase();
  const [input, setInput] = useState<string>("");
  const [chats, setChats] = useState();

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
    function writeChatData(currentUser: string, input: string) {
      const chatUUID: string = uuidv4().toString();
      console.log(currentUser)
      // TODO: 
      // Check a chat between two contacts doesn't already exist otherwise it'll create duplicate chats!
      try {
        set(ref(db, 'chats/' + chatUUID), {
          lastMessage: false,
          timestamp: false
        });

        const usersChatRef = ref(db, 'users/' + currentUser + '/chats');
        update(usersChatRef, {
          [chatUUID]: true
        })

        set(ref(db, 'members/' + chatUUID), {
          [currentUser]: true,
          [input]: true
        })
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    writeChatData(auth.currentUser.uid, input);
  }


  function handleSignOut() {
    auth.signOut();
    props.navigation.replace("Welcome")
  }

  // Read in user's active chats from realtime database
  function getUsersChatIDs(currentUser: string | null) {
    // Locate the chat ids under user's uid
    const dbRef = ref(db);
    get(child(dbRef, 'users/' + currentUser + '/chats')).then((snapshot) => {
      if (snapshot.exists()) {
        const data: string[] = (Object.keys(snapshot.val()));
        console.log(data)
        getUsersChatData(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  // Use the chat uids to retrieve data from /chats 

  function getUsersChatData(listOfIds: string[] | null) {
    const data:any = [];
    const dbRef = ref(db);
    if (listOfIds) {
      listOfIds.forEach(id => {
        get(child(dbRef, `members/${id}`)).then((snapshot) => {
          snapshot.forEach(childSnapshot => {
            if (childSnapshot.key !== auth.currentUser.uid) {
              data.push(childSnapshot.key)
            }
          })
        })
      })
    }
    if (data) {
      console.log(data)
      setChats(data);
      console.log(chats);
    }
  }


  useEffect(() => {
    getUsersChatIDs(auth.currentUser.uid);
  }, [])


  return (
    <>
      <View>
        <Text>Messages</Text>
        <Button title={"Sign out"} onPress={handleSignOut} />
        <TextInput
          placeholder="Contact to add"
          onChangeText={text => setInput(text)}
          value={input}
        />
        <Button title={"Create a chat"} onPress={handleNewChat} />
        <Text></Text>
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
