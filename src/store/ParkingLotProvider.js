import React, {useEffect, useReducer, useState} from 'react';
import ParkingLotContext from "./parking-lot-context";

const ParkingLotProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [entryPoint, setEntryPoint] = useState(1);
    const [error, setError] = useState('');

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
            setError('Cannot get data from the API endpoint. Please contact the developer.');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const fetchEnter = async (params) => {
        setIsLoading(true);
        const response = await fetch('http://joseph.local/api/parking/enter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        return await response.json();
    };

    const fetchExit = async (params) => {
        setIsLoading(true);
        const response = await fetch('http://joseph.local/api/parking/exit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        return await response.json();
    };

    const defaultParkingSlotsState = {
        entryOrExitQuantity: 0,
        parkingSlots: [],
        totalParkedVehicles: 0,
    };

    const parkingSlotsReducer = (state, action) => {
        let response;

        if (action.type === 'ENTER') {
            response = fetchEnter(action.data);
        }

        if (action.type === 'EXIT') {
            response = fetchExit(action.data);
            response.then((data) => {
                if (data.parkingSlip) {
                    dispatchParkingSlipState({
                        'type': 'EXIT',
                        'data': data
                    });
                }
            });
        }

        if (response) {
            response.then((data) => {
                if (data.errorMessage) {
                    setIsLoading(false);
                    setError(data.errorMessage);
                } else {
                    fetchParkingSlotsData(entryPoint);
                }
            });

            return state;
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

    const clearErrorHandler = () => {
        setError('');
    };

    useEffect(() => {
        fetchParkingSlotsData(entryPoint);
    }, [parkingSlotsState.data, entryPoint]);

    const parkingLotContext = {
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
        error: error,
        clearError: clearErrorHandler
    };

    return (
        <ParkingLotContext.Provider value={parkingLotContext}>
            {props.children}
        </ParkingLotContext.Provider>
    );
};

export default ParkingLotProvider;