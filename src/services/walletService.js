import * as fcl from '@onflow/fcl';

// Function to connect wallet
export const connectWallet = async () => {
    try {
        await fcl.authenticate();
        console.log('Wallet connected successfully.');
    } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
    }
};

// Function to disconnect wallet
export const disconnectWallet = async () => {
    try {
        await fcl.unauthenticate();
        console.log('Wallet disconnected successfully.');
    } catch (error) {
        console.error('Error disconnecting wallet:', error);
        throw error;
    }
};


// Get current user's account
export const getCurrentUserAccount = async () => {
    try {
        return fcl.currentUser().snapshot?.account;
    } catch (error) {
        console.error('Error getting current user account:', error);
        throw error;
    }
};
