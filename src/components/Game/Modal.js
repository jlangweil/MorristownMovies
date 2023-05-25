import React from 'react';
import './Modal.css';

const Modal = ({ message, handleClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{message}</h3>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
