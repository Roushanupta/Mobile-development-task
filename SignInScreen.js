import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert("Invalid credentials");
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign Up</Text>
    </View>
  );
};

export default SignInScreen;
