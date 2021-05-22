import React, { useReducer, useEffect } from 'react';
import ParkingSlotsContext from "./parking-slots-context";

const defaultParkingSlotsState = {
    parkingSlots: [],
    totalParkedVehicles: 0,
};

const ParkingSlotsProvider = (props) => {

    const fetchParkingSlotsData = () => {
        fetch('http://joseph.local/api/parking/slots').then((response) => {
            return response.json()
        }).then((data) => {
            dispatchParkingSlotsState({
                'type': 'UPDATE',
                'data': data
            });
        });
    };

    const parkingSlotsReducer = (state, action) => {
        if (action.type === 'ENTER') {

            fetch('http://joseph.local/api/parking/enter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(action.data)
            }).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);
                fetchParkingSlotsData();
            });

        }

        if (action.type === 'EXIT') {

            fetch('http://joseph.local/api/parking/exit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(action.data)
            }).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);
                fetchParkingSlotsData();
            });
        }

        if (action.type === 'UPDATE') {

            let totalParkedVehicles = 0;
            for (let i of action.data.parkingSlots) {
                if (i.vehicle) totalParkedVehicles++;
            }

            return {
                parkingSlots: action.data.parkingSlots,
                totalParkedVehicles: totalParkedVehicles
            };
        }

        return defaultParkingSlotsState;
    };

    useEffect(() => {
        fetchParkingSlotsData();
    }, []);

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

    const exitHandler = (parkingSlotId) => {
        dispatchParkingSlotsState({
            'type': 'EXIT',
            'data': {
                'parkingSlotId': parkingSlotId
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