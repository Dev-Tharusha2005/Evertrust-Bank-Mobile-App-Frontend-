import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  // User data example
  const [user] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City, Country',
    dob: '01/01/1990',
    accountNumber: '1234567890',
    balance: '$5,230.75',
    bankName: 'EverTrust',
  });

  const options = [
    { id: '2', name: 'Transaction History', icon: 'history', onPress: () => alert('Transaction History') },
    { id: '3', name: 'Statements', icon: 'file-invoice', onPress: () => alert('Statements') },
    { id: '4', name: 'Settings', icon: 'cog', onPress: () => alert('Settings') },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#ff3131" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Info */}
        <View style={styles.profileContainer}>
          <FontAwesome5 name="user-circle" size={100} color="#ff3131" style={{ marginBottom: 20 }} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.profileEmail}>{user.phone}</Text>
        </View>

        {/* Personal Details (Read-Only) */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Personal Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date of Birth:</Text>
            <Text style={styles.detailValue}>{user.dob}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{user.address}</Text>
          </View>
        </View>

        {/* Banking Details (Read-Only) */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Banking Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Bank:</Text>
            <Text style={styles.detailValue}>{user.bankName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Account Number:</Text>
            <Text style={styles.detailValue}>{user.accountNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Current Balance:</Text>
            <Text style={styles.detailValue}>{user.balance}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => alert('Edit Profile')}>
            <FontAwesome5 name="edit" size={20} color="#fff" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#777' }]} onPress={() => navigation.navigate('SignIn')}>
            <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
            <Text style={styles.actionText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* More Options */}
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity key={option.id} style={styles.optionButton} onPress={option.onPress}>
              <FontAwesome5 name={option.icon} size={20} color="#ff3131" />
              <Text style={styles.optionText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f2f2f2' },
  container: { flex: 1 },

  header: {
    backgroundColor: '#ff3131',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '700' },

  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profileName: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 5 },
  profileEmail: { fontSize: 16, color: '#666', marginBottom: 2 },

  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  detailTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 10 },
  detailItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { fontSize: 14, color: '#666' },
  detailValue: { fontSize: 14, fontWeight: '600', color: '#333' },

  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3131',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center',
  },
  actionText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 10 },

  optionsContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: { fontSize: 16, fontWeight: '600', marginLeft: 15, color: '#333' },
});
