import React, { useContext } from 'react';

import ParkingSlotsContext from "../../store/parking-slots-context";
import Vehicle from "../Vehicle/Vehicle";

const ParkingSlot = (props) => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    const exitHandler = () => {
        parkingSlotsContext.exit(props.id);
    };

    return (
        <li className={`parking-slot-${props.type}`}>
            <div className="parking-slot-header">
                <span>{props.id}</span>
                <span className={"dot " + (props.isAvailable === '1' ? 'green' : 'red')} />
            </div>

            {props.vehicle && props.parkingSlip && <Vehicle
                plateNumber={props.vehicle.plateNumber}
                type={props.vehicle.type}
                color={props.vehicle.color}
                entryTime={props.parkingSlip.entryTime}
                onExit={exitHandler}
            />}

            <div className="parking-slot-footer">
                <span>{props.type}</span>
                <span>Distance {props.distancePoints}</span>
            </div>
        </li>
    );
};

export default ParkingSlot;