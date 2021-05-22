import React, { useContext } from 'react';

import parkingImage from '../../assets/parkingImage.PNG';
import carIcon from '../../assets/car-icon.png';

import ParkingSlotsContext from "../../store/parking-slots-context";

const Header = () => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    return (
        <>
            <header className="header">
                <h1>Parking Lot</h1>

                <button type="button" className="car-icon">
                    <img src={carIcon} alt='Car Icon image' />
                    <div className="quantity">{parkingSlotsContext.totalParkedVehicles}</div>
                </button>
            </header>
            <div className="header-image">
                <img src={parkingImage} alt='Parking Lot image' />
            </div>
        </>
    );
};

export default Header;