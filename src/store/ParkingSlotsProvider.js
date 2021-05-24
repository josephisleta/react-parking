import React, { useReducer, useEffect, useState } from 'react';
import ParkingSlotsContext from "./parking-slots-context";

const ParkingSlotsProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchParkingSlotsData = (entryPoint = 1) => {
        setIsLoading(true);
        fetch('http://joseph.local/api/parking?entryPoint=' + entryPoint).then((response) => {
            return response.json()
        }).then((data) => {
            dispatchParkingSlotsState({
                'type': 'UPDATE',
                'data': data
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const defaultParkingSlotsState = {
        entryOrExitQuantity: 0,
        parkingSlots: [],
        totalParkedVehicles: 0,
    };

    const parkingSlotsReducer = (state, action) => {
        if (action.type === 'ENTER') {
            setIsLoading(true);
            fetch('http://joseph.local/api/parking/enter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(action.data)
            }).then((response) => {
                return response.json()
            }).then((data) => {
                fetchParkingSlotsData(entryPoint);
            });

        }

        if (action.type === 'EXIT') {
            setIsLoading(true);
            fetch('http://joseph.local/api/parking/exit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(action.data)
            }).then((response) => {
                return response.json()
            }).then((data) => {
                dispatchParkingSlipState({
                    'type': 'EXIT',
                    'data': data
                });
            });
        }

        if (action.type === 'UPDATE') {

            let totalParkedVehicles = 0;
            for (let i of action.data.parkingSlots) {
                if (i.vehicle) totalParkedVehicles++;
            }

            return {
                entryOrExitQuantity: action.data.entryOrExitQuantity,
                parkingSlots: action.data.parkingSlots,
                totalParkedVehicles: totalParkedVehicles
            };
        }

        return defaultParkingSlotsState;
    };

    const [parkingSlotsState, dispatchParkingSlotsState] = useReducer(parkingSlotsReducer, defaultParkingSlotsState);


    const defaultParkingSlipState = {
        parkingSlip: {},
        displayParkingSlip: false,
    };

    const parkingSlipReducer = (state, action) => {

        if (action.type === 'EXIT') {
            return {
                parkingSlip: action.data.parkingSlip,
                displayParkingSlip: true
            };
        }

        if (action.type === 'TOGGLE') {
            return {
                parkingSlip: state.parkingSlip,
                displayParkingSlip: !state.displayParkingSlip
            };
        }

        return defaultParkingSlipState;
    };

    const [parkingSlipState, dispatchParkingSlipState] = useReducer(parkingSlipReducer, defaultParkingSlipState);

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

    const exitHandler = (parkingSlotId) => {
        dispatchParkingSlotsState({
            'type': 'EXIT',
            'data': {
                'parkingSlotId': parkingSlotId
            }
        });
    };

    const updateEntryPointHandler = (entryPoint) => {
        setEntryPoint(entryPoint);
    };

    const toggleParkingSlipHandler = () => {
        dispatchParkingSlipState({
            'type': 'TOGGLE'
        });
    };

    const [entryPoint, setEntryPoint] = useState(1);

    const [error, setError] = useState({});

    useEffect(() => {
        fetchParkingSlotsData(entryPoint);
    }, [parkingSlotsState.data, parkingSlipState.parkingSlip, entryPoint]);

    const parkingSlotsContext = {
        entryOrExitQuantity: parkingSlotsState.entryOrExitQuantity,
        parkingSlots: parkingSlotsState.parkingSlots,
        totalParkedVehicles: parkingSlotsState.totalParkedVehicles,
        enter: enterHandler,
        exit: exitHandler,
        parkingSlip: parkingSlipState,
        toggleParkingSlip: toggleParkingSlipHandler,
        currentEntryPoint: entryPoint,
        updateEntryPoint: updateEntryPointHandler,
        isLoading: isLoading,
        error: error
    };

    return (
        <ParkingSlotsContext.Provider value={parkingSlotsContext}>
            {props.children}
        </ParkingSlotsContext.Provider>
    );
};

export default ParkingSlotsProvider;