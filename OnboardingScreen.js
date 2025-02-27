import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const OnboardingScreen = ({ navigation }) => {
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [diet, setDiet] = useState('');

  const handleSave = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    try {
      await firestore().collection('users').doc(userId).set({ birthdate, gender, diet });
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert("Error saving data");
    }
  };

  return (
    <View>
      <Text>Onboarding</Text>
      <TextInput placeholder="Birthdate" value={birthdate} onChangeText={setBirthdate} />
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput placeholder="Dietary Preference" value={diet} onChangeText={setDiet} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default OnboardingScreen;
