import React from 'react';
import Modal from "./Modal";

const ErrorModal = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <div className="slip-header">
                <h2>Something went wrong</h2>
            </div>
            <div className="slip-content">
                <div>
                    {props.message}
                </div>
            </div>
            <div className="slip-actions">
                <button type="button" onClick={props.onClose}>Okay</button>
            </div>
        </Modal>
    );
};

export default ErrorModal;