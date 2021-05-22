import React, { useContext } from 'react';
import ParkingSlot from "./ParkingSlot";
import Card from "../UI/Card";

import ParkingSlotsContext from "../../store/parking-slots-context";

const ParkingSlotList = (props) => {

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
        </section>
    );
};

export default ParkingSlotList;