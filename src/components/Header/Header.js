import React, { useContext } from 'react';

import parkingImage from '../../assets/parkingImage.PNG';

import ParkingSlotsContext from "../../store/parking-slots-context";

const Header = () => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    return (
        <>
            <header className="header">
                <h1>Parking Lot</h1>

                {parkingSlotsContext.totalParkedVehicles}
            </header>
            <div className="header-image">
                <img src={parkingImage} alt='Parking Lot image' />
            </div>
        </>
    );
};

export default Header;