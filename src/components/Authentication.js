import React from 'react';
import { connectWallet, disconnectWallet } from '../services/walletService';

const Authentication = () => {
    const handleConnectWallet = async () => {
        try {
            await connectWallet();
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const handleDisconnectWallet = async () => {
        try {
            await disconnectWallet();
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    };

    return (
        <div>
            <button onClick={handleConnectWallet}>Connect Wallet</button>
            <button onClick={handleDisconnectWallet}>Disconnect Wallet</button>
        </div>
    );
};

export default Authentication;
