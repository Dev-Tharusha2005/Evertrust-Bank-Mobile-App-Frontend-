import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default function EmailVerification({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < code.length - 1) {
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require('./assets/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.subtitle}>Enter the 4-digit code sent to your email to continue.</Text>

      {/* Card Container */}
      <View style={styles.card}>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputs.current[index] = ref}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ff3131', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30, textAlign: 'center', lineHeight: 22 },
  card: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ff3131',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff3131',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ff3131',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
