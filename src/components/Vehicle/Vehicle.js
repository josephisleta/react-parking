import React from 'react';
import Moment from 'moment'

import exitIcon from '../../assets/exit-icon.PNG';

const Vehicle = (props) => {
    return (
        <div className="vehicle-container">
            <div className={`card vehicle-${props.type}`}>

                <div className="vehicle-header">
                    {props.plateNumber}
                    <button type="button" className="btn exit" onClick={props.onExit}>
                        <img src={exitIcon} alt="Exit icon" />
                    </button>
                </div>
                <div className="vehicle-info">
                    <span>{props.type}</span>
                    <span>{props.color}</span>
                </div>
                <div>{Moment(props.entryTime).fromNow()}</div>
            </div>
        </div>
    );
};

export default Vehicle;