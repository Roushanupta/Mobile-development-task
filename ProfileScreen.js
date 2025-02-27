import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      const doc = await firestore().collection('users').doc(userId).get();
      setUserData(doc.data());
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      {userData ? (
        <>
          <Text>Birthdate: {userData.birthdate}</Text>
          <Text>Gender: {userData.gender}</Text>
          <Text>Diet: {userData.diet}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Logout" onPress={() => auth().signOut().then(() => navigation.navigate('SignIn'))} />
    </View>
  );
};

export default ProfileScreen;
