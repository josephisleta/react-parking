import React, { useContext } from 'react';

import ParkingLotContext from "../../store/parking-lot-context";
import Vehicle from "../Vehicle/Vehicle";

const ParkingSlot = (props) => {

    const parkingLotContext = useContext(ParkingLotContext);

    const exitHandler = () => {
        parkingLotContext.exit(props.id);
    };

    return (
        <li className={`parking-slot-${props.type}`}>
            <div className="parking-slot-header">
                <b>{props.id}</b>
                <span className={"dot " + (props.isAvailable === '1' ? 'green' : 'red')} />
            </div>

            <div className="parking-slot-footer">
                <b>{props.type}</b>
                <i className="parking-slot-distance">Distance {props.distancePoints}</i>
            </div>

            {props.vehicle && props.parkingSlip && <Vehicle
                plateNumber={props.vehicle.plateNumber}
                type={props.vehicle.type}
                color={props.vehicle.color}
                entryTime={props.parkingSlip.entryTime}
                onExit={exitHandler}
            />}
        </li>
    );
};

export default ParkingSlot;