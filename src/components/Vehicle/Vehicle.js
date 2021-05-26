import React from 'react';
import Moment from 'moment';

import exitIcon from '../../assets/images/exit-icon.PNG';

const Vehicle = (props) => {
    return (
        <div className="vehicle-container">
            <div className={`card vehicle-${props.type}`} style={{ backgroundColor: props.color }}>
                <div className="vehicle-header">

                    <b className="vehicle-type">{props.type}</b>
                    <button type="button" className="btn exit" onClick={props.onExit}>
                        <img src={exitIcon} alt="Exit icon" />
                    </button>
                </div>
                <div className={`vehicle-info type-${props.type}`}>
                    <div className="vehicle-plate-number"><b>{props.plateNumber}</b></div>
                    <div className="vehicle-color">{props.color}</div>
                    <div className="vehicle-time">{Moment(props.entryTime).fromNow()}</div>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;