import React, {useContext, useState} from 'react';
import ParkingSlot from "./ParkingSlot";
import Card from "../UI/Card";

import ParkingSlotsContext from "../../store/parking-slots-context";
import ParkingSlip from "../ParkingSlips/ParkingSlip";

const ParkingSlotList = () => {
    const parkingSlotsContext = useContext(ParkingSlotsContext);

    return (
        <section className="parking-slot-container">
            <Card>
                <ul className="parking-slot-list">
                    {parkingSlotsContext.parkingSlots.map((parkingSlot) => (
                        <ParkingSlot
                            key={parkingSlot.id}
                            id={parkingSlot.id}
                            type={parkingSlot.type}
                            distancePoints={parkingSlot.distancePoints}
                            isAvailable={parkingSlot.isAvailable}
                            vehicle={parkingSlot.vehicle}
                            parkingSlip={parkingSlot.parkingSlip}
                        />
                    ))}
                </ul>
            </Card>

            {parkingSlotsContext.parkingSlip.displayParkingSlip &&
            <ParkingSlip
                data={parkingSlotsContext.parkingSlip.parkingSlip}
                onClose={parkingSlotsContext.toggleParkingSlip}
            />}
        </section>
    );
};

export default ParkingSlotList;