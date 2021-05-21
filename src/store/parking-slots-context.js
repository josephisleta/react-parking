import React from 'react';

const ParkingSlotsContext = React.createContext({
    parkingSlots: [],
    totalParkedVehicles: 0,
    enter: (entryPoint, plateNumber, type, color) => {},
    exit: (parkingSlotId) => {}
});

export default ParkingSlotsContext;