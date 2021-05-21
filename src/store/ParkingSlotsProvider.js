import React, { useReducer } from 'react';
import ParkingSlotsContext from "./parking-slots-context";

const defaultParkingSlotsState = {
    parkingSlots: [],
    totalParkedVehicles: 0,
};

const parkingSlotsReducer = (state, action) => {
    if (action.type === 'ENTER') {

        // TODO api call on /api/parking/enter

        let newParkingSlots = [
            ...state.parkingSlots,
            action.data
        ];

        return {
            parkingSlots: newParkingSlots,
            totalParkedVehicles: state.totalParkedVehicles + 1
        };
    }

    if (action.type === 'EXIT') {

        // TODO api call on /api/parking/exit

        let newParkingSlots = state.parkingSlots.filter((parkingSlot) => {
            return parkingSlot.plateNumber !== action.data.plateNumber
        });

        return {
            parkingSlots: newParkingSlots,
            totalParkedVehicles: state.totalParkedVehicles - 1
        };
    }

    return defaultParkingSlotsState;
};

const ParkingSlotsProvider = (props) => {

    const [parkingSlotsState, dispatchParkingSlotsState] = useReducer(parkingSlotsReducer, defaultParkingSlotsState);

    const enterHandler = (data) => {
        dispatchParkingSlotsState({
            'type': 'ENTER',
            'data': {
                'entryPoint': data.entryPoint,
                'plateNumber': data.plateNumber,
                'type': data.type,
                'color': data.color,
            }
        });
    };

    const exitHandler = (plateNumber) => {
        dispatchParkingSlotsState({
            'type': 'EXIT',
            'data': {
                'plateNumber': plateNumber
            }
        });
    };

    const parkingSlotsContext = {
        parkingSlots: parkingSlotsState.parkingSlots,
        totalParkedVehicles: parkingSlotsState.totalParkedVehicles,
        enter: enterHandler,
        exit: exitHandler
    };

    return (
        <ParkingSlotsContext.Provider value={parkingSlotsContext}>
            {props.children}
        </ParkingSlotsContext.Provider>
    );
};

export default ParkingSlotsProvider;