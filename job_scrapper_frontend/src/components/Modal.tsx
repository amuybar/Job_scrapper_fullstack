// src/components/Modal.tsx

import React from 'react';

interface ModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleFormSubmit: (event: React.FormEvent) => void;
  cv: File | null;
  setCv: React.Dispatch<React.SetStateAction<File | null>>;
  coverLetter: string;
  setCoverLetter: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  handleModalClose,
  handleFormSubmit,
  cv,
  setCv,
  coverLetter,
  setCoverLetter,
  name,
  setName,
}) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleModalClose}>&times;</span>
      <h2>Apply for Job</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>CV:</label>
          <input
            type="file"
            onChange={(e) => setCv(e.target.files ? e.target.files[0] : null)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cover Letter:</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleModalClose}>Close</button>
        </div>
      </form>
    </div>
  </div>
);

export default Modal;
