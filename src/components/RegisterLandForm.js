import React, { useState } from 'react';
import { registerLand } from '../services/flowService';

const RegisterLandForm = () => {
    const [location, setLocation] = useState('');
    const [area, setArea] = useState('');

    const handleRegisterLand = async () => {
        try {
            await registerLand(location, area);
            // Handle success
        } catch (error) {
            console.error('Error registering land:', error);
        }
    };

    return (
        <div>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" />
            <button onClick={handleRegisterLand}>Register Land</button>
        </div>
    );
};

export default RegisterLandForm;
