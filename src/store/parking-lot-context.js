import React from 'react';

const ParkingLotContext = React.createContext({
    entryOrExitQuantity: 0,
    parkingSlots: [],
    totalParkedVehicles: 0,
    enter: (data) => {},
    exit: (parkingSlotId) => {},
    parkingSlip: {},
    toggleParkingSlip: () => {},
    currentEntryPoint: 1,
    updateEntryPoint: () => {},
    isLoading: false,
    error: '',
    clearError: () => {}
});

export default ParkingLotContext;