import React, { useState } from 'react';
// import './PopupForm.css';

const CalibrationModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Uspešno vneseno');
    handleClose();
  };

  return (
    <>
      <button className="open-form-button mr-5 blue-btn" onClick={handleShow}>
        Kalibracija
      </button>

      {show && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal">
            <form onSubmit={handleSubmit} className="modal">
              <label htmlFor="name mb-10">Trenutna proizvodnja elektrarne:</label>
              <input type="text" id="name" placeholder="Proizvodnja" name="name" />
              <div>
                <button type="submit" className="blue-btn mt-5">Potrdi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CalibrationModal;
