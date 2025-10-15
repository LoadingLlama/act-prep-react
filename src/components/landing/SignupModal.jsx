import React, { useState } from 'react';
import { modalStyles } from '../../styles/landing/modal.styles';

const SignupModal = ({ isOpen, closeModal, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    score: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      school: '',
      grade: '',
      score: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.modalOverlay} onClick={closeModal}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={modalStyles.closeButton} onClick={closeModal}>×</button>

        <h2 style={modalStyles.modalTitle}>Join the Waitlist</h2>
        <p style={modalStyles.modalSubtitle}>
          Get early access and exclusive prep materials
        </p>

        <form onSubmit={handleSubmit} style={modalStyles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            style={modalStyles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            style={modalStyles.input}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            style={modalStyles.input}
          />

          <input
            type="text"
            name="school"
            placeholder="School Name"
            value={formData.school}
            onChange={handleInputChange}
            style={modalStyles.input}
          />

          <select
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            style={modalStyles.select}
            required
          >
            <option value="">Select Grade</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="score"
            placeholder="Current/Target ACT Score"
            value={formData.score}
            onChange={handleInputChange}
            style={modalStyles.input}
          />

          <button type="submit" style={modalStyles.submitButton}>
            Get Early Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;