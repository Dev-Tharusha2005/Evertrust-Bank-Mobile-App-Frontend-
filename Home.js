import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView, SafeAreaView, StatusBar, TextInput, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';


const { width } = Dimensions.get('window');

const transactions = [
    { id: '1', type: 'Payment Received', amount: '+$500', date: 'Aug 28', time: '09:30 AM' },
    { id: '2', type: 'Sent to John', amount: '-$120', date: 'Aug 27', time: '02:15 PM' },
    { id: '3', type: 'Coffee Shop', amount: '-$5', date: 'Aug 26', time: '08:45 AM' },
];

export default function Home({ navigation }) {
    const [transferVisible, setTransferVisible] = useState(false);
    const [payBillVisible, setPayBillVisible] = useState(false);

    // Transfer inputs
    const [transferName, setTransferName] = useState('');
    const [transferAccount, setTransferAccount] = useState('');
    const [transferRef, setTransferRef] = useState('');
    const [transferAmount, setTransferAmount] = useState('');

    // Pay Bill inputs
    const [billType, setBillType] = useState('Electricity');
    const [billAccount, setBillAccount] = useState('');
    const [billRef, setBillRef] = useState('');
    const [billAmount, setBillAmount] = useState('');

    const actions = [
        { id: '1', name: 'Transfer', icon: 'paper-plane', onPress: () => setTransferVisible(true) },
        { id: '2', name: 'Pay Bills', icon: 'file-invoice-dollar', onPress: () => setPayBillVisible(true) },
        { id: '3', name: 'Profile', icon: 'user', onPress: () => navigation.navigate('Profile') },
        { id: '4', name: 'More', icon: 'ellipsis-h' },
    ];

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#ff3131" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>Hello, John</Text>
                    <Text style={styles.balanceTitle}>Current Balance</Text>
                    <Text style={styles.balanceAmount}>$5,230.75</Text>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                    {actions.map(action => (
                        <TouchableOpacity
                            key={action.id}
                            style={styles.actionButton}
                            onPress={action.onPress ? action.onPress : null}
                        >
                            <FontAwesome5 name={action.icon} size={24} color="#ff3131" style={{ marginBottom: 10 }} />
                            <Text style={styles.actionText}>{action.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recent Transactions */}
                <Text style={styles.transactionsTitle}>Recent Transactions</Text>
                <FlatList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.transactionItem}>
                            <View style={styles.transactionLeft}>
                                <FontAwesome5 name="exchange-alt" size={20} color="#ff3131" style={{ marginRight: 10 }} />
                                <View>
                                    <Text style={styles.transactionType}>{item.type}</Text>
                                    <Text style={styles.transactionDateTime}>{item.date} • {item.time}</Text>
                                </View>
                            </View>
                            <View style={styles.transactionRight}>
                                <Text style={styles.transactionAmount}>{item.amount}</Text>
                            </View>
                        </View>
                    )}
                    style={styles.transactionsList}
                    scrollEnabled={false}
                />
            </ScrollView>

            {/* Transfer Modal */}
            <Modal visible={transferVisible} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Transfer</Text>
                        <TextInput placeholder="Recipient Name" style={styles.modalInput} value={transferName} onChangeText={setTransferName} />
                        <TextInput placeholder="Account Number" style={styles.modalInput} value={transferAccount} onChangeText={setTransferAccount} keyboardType="numeric" />
                        <TextInput placeholder="Reference" style={styles.modalInput} value={transferRef} onChangeText={setTransferRef} />
                        <TextInput placeholder="Amount" style={styles.modalInput} value={transferAmount} onChangeText={setTransferAmount} keyboardType="numeric" />
                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            setTransferVisible(false);
                            setTransferName(''); setTransferAccount(''); setTransferRef(''); setTransferAmount('');
                        }}>
                            <Text style={styles.modalButtonText}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTransferVisible(false)}>
                            <Text style={{ marginTop: 10, color: 'red' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Pay Bills Modal */}
            <Modal visible={payBillVisible} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Pay Bill</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={billType} onValueChange={setBillType} style={styles.picker}>
                                <Picker.Item label="Electricity" value="Electricity" />
                                <Picker.Item label="Water" value="Water" />
                                <Picker.Item label="Internet" value="Internet" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                        <TextInput placeholder="Account Number" style={styles.modalInput} value={billAccount} onChangeText={setBillAccount} keyboardType="numeric" />
                        <TextInput placeholder="Reference" style={styles.modalInput} value={billRef} onChangeText={setBillRef} />
                        <TextInput placeholder="Amount" style={styles.modalInput} value={billAmount} onChangeText={setBillAmount} keyboardType="numeric" />
                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            setPayBillVisible(false);
                            setBillType('Electricity'); setBillAccount(''); setBillRef(''); setBillAmount('');
                        }}>
                            <Text style={styles.modalButtonText}>Pay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPayBillVisible(false)}>
                            <Text style={{ marginTop: 10, color: 'red' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#f2f2f2' },
    container: { flex: 1 },

    header: {
        backgroundColor: '#ff3131',
        padding: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginBottom: 20,
    },
    greeting: { color: '#fff', fontSize: 22, fontWeight: '600' },
    balanceTitle: { color: '#fff', fontSize: 16, marginTop: 5 },
    balanceAmount: { color: '#fff', fontSize: 32, fontWeight: '700', marginTop: 5 },

    actionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    actionButton: {
        width: (width - 60) / 2,
        backgroundColor: '#fff',
        paddingVertical: 25,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    actionText: { color: '#ff3131', fontSize: 16, fontWeight: '600' },

    transactionsTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    transactionsList: { paddingHorizontal: 20 },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 18,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    transactionLeft: { flexDirection: 'row', alignItems: 'center' },
    transactionType: { fontSize: 16, color: '#333', fontWeight: '600' },
    transactionDateTime: { fontSize: 12, color: '#999', marginTop: 2 },
    transactionRight: { alignItems: 'flex-end' },
    transactionAmount: { fontSize: 16, fontWeight: '700', color: '#ff3131' },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 15 },
    modalInput: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 15 },
    modalButton: {
        backgroundColor: '#ff3131',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 5,
        width: '100%',      // Make full width
        alignItems: 'center' // Keep text centered
    },

    modalButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, width: '100%', marginBottom: 15 },
    picker: { width: '100%' },
});
