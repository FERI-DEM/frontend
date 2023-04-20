import React, { useState } from 'react';
// import './PopupForm.css';

const InviteFriendModal = () => {
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
      <button className="open-form-button blue-btn mb-5 ml-0 mr-auto" onClick={handleShow}>
        Dodaj člana
      </button>

      {show && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal">
            <form onSubmit={handleSubmit} className="modal">
              <label htmlFor="name mb-10">Povabi člana</label>
              <div>
                <input type="email" id="name" placeholder="Email" name="name" />
              </div>
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

export default InviteFriendModal;
