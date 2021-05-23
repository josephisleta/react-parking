import React from 'react';

const ParkingSlotsContext = React.createContext({
    parkingSlots: [],
    totalParkedVehicles: 0,
    enter: (data) => {},
    exit: (parkingSlotId) => {},
    parkingSlip: {},
    toggleParkingSlip: () => {},
    updateEntryPoint: () => {}
});

export default ParkingSlotsContext;