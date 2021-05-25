import React, { useContext } from 'react';

import ParkingLotContext from "../../store/parking-lot-context";
import ParkingSlip from "../ParkingSlips/ParkingSlip";
import ParkingSlot from "./ParkingSlot";
import Card from "../UI/Card";
import Loader from "../UI/Loader";

const ParkingSlotList = () => {
    const parkingLotContext = useContext(ParkingLotContext);

    return (
        <section className="parking-slot-container">
            <Card>
                <ul className="parking-slot-list">
                    {parkingLotContext.isLoading && <Loader />}

                    {!parkingLotContext.isLoading && parkingLotContext.parkingSlots.map((parkingSlot) => (
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

            {parkingLotContext.parkingSlip.displayParkingSlip &&
            <ParkingSlip
                data={parkingLotContext.parkingSlip.parkingSlip}
                onClose={parkingLotContext.toggleParkingSlip}
            />}
        </section>
    );
};

export default ParkingSlotList;