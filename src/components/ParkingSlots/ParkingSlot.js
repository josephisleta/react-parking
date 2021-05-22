import React, { useContext } from 'react';

import ParkingSlotsContext from "../../store/parking-slots-context";
import Vehicle from "../Vehicle/Vehicle";

const ParkingSlot = (props) => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    const exitHandler = (event) => {
        parkingSlotsContext.exit(props.id);
    };

    return (
        <li className="parking-slot">
            <span>
                ID: {props.id}
            </span>
            <p>
                Type: {props.type}
            </p>
            <span>
                Distance Points{props.distancePoints}
            </span>
            <span>
                Is Available{props.isAvailable}
            </span>

            {props.vehicle && <Vehicle
                plateNumber={props.vehicle.plateNumber}
                type={props.vehicle.type}
                color={props.vehicle.color}
                onExit={exitHandler}
            />}

            {props.parkingSlip && <div>
                Parking Slip
                <span>{props.parkingSlip.entryTime}</span>
            </div>}
        </li>
    );
};

export default ParkingSlot;