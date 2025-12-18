import React, { createContext, useContext, useState } from 'react';

const WorkerContext = createContext();

export const useWorkerContext = () => useContext(WorkerContext);

export const WorkerProvider = ({ children }) => {
    const [isWorker, setIsWorker] = useState(false); // Toggle between Employer/Worker view for demo
    const [isOnline, setIsOnline] = useState(false);
    const [location, setLocation] = useState(null);

    const toggleOnlineStatus = () => {
        setIsOnline(prev => !prev);
        if (!isOnline) {
            // Simulate getting location when going online
            // In a real app, uses navigator.geolocation
            setLocation({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi for demo
        }
    };

    const value = {
        isWorker,
        setIsWorker,
        isOnline,
        toggleOnlineStatus,
        location,
        setLocation
    };

    return (
        <WorkerContext.Provider value={value}>
            {children}
        </WorkerContext.Provider>
    );
};
