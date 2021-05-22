import React from 'react';

const Vehicle = (props) => {
    return (
        <div className="card">
            Vehicle
            <span>{props.plateNumber}</span>
            <span>{props.type}</span>
            <span>{props.color}</span>

            <button type="button" onClick={props.onExit}>x</button>
        </div>
    );
};

export default Vehicle;