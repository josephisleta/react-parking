import React, { useContext } from 'react';
import ParkingSlot from "./ParkingSlot";
import Card from "../UI/Card";

import ParkingSlotsContext from "../../store/parking-slots-context";

const ParkingSlotList = (props) => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    return (
        <section className="parking-slot-list">
            <Card>
                <ul>
                    {parkingSlotsContext.parkingSlots.map((parkingSlot) => (
                        <ParkingSlot
                            key={parkingSlot.plateNumber}
                            entryPoint={parkingSlot.entryPoint}
                            plateNumber={parkingSlot.plateNumber}
                            type={parkingSlot.type}
                            color={parkingSlot.color}
                        />
                    ))}
                </ul>
            </Card>
        </section>
    );
};

export default ParkingSlotList;