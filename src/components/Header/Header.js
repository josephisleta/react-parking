import React, { useContext } from 'react';

import ParkingLotContext from "../../store/parking-lot-context";

import parkingImage from '../../assets/images/parkingImage.PNG';
import carIcon from '../../assets/images/car-icon.png';

const Header = () => {

    const parkingLotContext = useContext(ParkingLotContext);

    return (
        <>
            <header className="header">
                <h1>Parking Lot</h1>

                <div className="header-button-container">
                    <button type="button" className="car-icon">
                        <img src={carIcon} alt='Car Icon image' />
                        <div className="quantity">{parkingLotContext.totalParkedVehicles}</div>
                        <span className="parking-slot-icon" />
                        <div className="quantity">{parkingLotContext.parkingSlots.length - parkingLotContext.totalParkedVehicles}</div>
                    </button>
                </div>
            </header>
            <div className="header-image">
                <img src={parkingImage} alt='Parking Lot image' />
            </div>
        </>
    );
};

export default Header;