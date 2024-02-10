import React, { useState } from 'react';
import { transferOwnership } from '../services/flowService';

const TransferOwnershipForm = () => {
    const [location, setLocation] = useState('');
    const [newOwner, setNewOwner] = useState('');

    const handleTransferOwnership = async () => {
        try {
            await transferOwnership(location, newOwner);
            // Handle success
        } catch (error) {
            console.error('Error transferring ownership:', error);
        }
    };

    return (
        <div>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <input type="text" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} placeholder="New Owner Address" />
            <button onClick={handleTransferOwnership}>Transfer Ownership</button>
        </div>
    );
};

export default TransferOwnershipForm;
