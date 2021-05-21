import React, { useContext } from 'react';

import ParkingSlotsContext from "../../store/parking-slots-context";

const ParkingSlot = (props) => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    const exitHandler = (event) => {
        parkingSlotsContext.exit(props.plateNumber);
    };

    return (
        <li className="parking-slot">
            <span>
                {props.entryPoint}
            </span>
            <p>
                {props.plateNumber}
            </p>
            <span>
                {props.type}
            </span>
            <span>
                {props.color}
            </span>
            <button type="button" onClick={exitHandler}>x</button>
        </li>
    );
};

export default ParkingSlot;