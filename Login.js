import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform, Alert, ToastAndroid } from 'react-native';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {

        const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Image
                source={require('./assets/icon.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue managing your finances securely.</Text>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EmailVerification')}
                >
                    <Text style={styles.buttonText}>Next</Text>
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
    title: { fontSize: 34, fontWeight: 'bold', color: '#ff3131', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#555', marginBottom: 30, textAlign: 'center', lineHeight: 22 },
    card: { width: width - 40, backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 10 },
    input: { width: '100%', height: 50, borderColor: '#ff3131', borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, marginBottom: 20, fontSize: 16, color: '#000' },
    button: { backgroundColor: '#ff3131', width: '100%', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#ff3131', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
    buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

});
