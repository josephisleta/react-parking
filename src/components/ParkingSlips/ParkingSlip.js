import React from 'react';
import Modal from "../UI/Modal";

const ParkingSlip = (props) => {

    return (
        <>
            <Modal onClose={props.onClose}>
                <div className="slip-header">
                    <h2>Parking Slip # {props.data.id}</h2>
                </div>
                <div className="slip-content">
                    <div>
                        Parking Slot <b>{props.data.parkingSlotId}</b>
                    </div>
                    <div>
                        Plate number: <b>{props.data.plateNumber}</b>
                    </div>
                    <div className="date">
                        Entry time: {props.data.entryTime}
                    </div>
                    <div className="date">
                        Exit time: {props.data.exitTime}
                    </div>
                    <div className="fee">
                        ₱{props.data.fee}
                    </div>
                </div>
                <div className="slip-actions">
                    <button type="button" onClick={props.onClose}>Okay</button>
                </div>
            </Modal>
        </>
    );
};

export default ParkingSlip;