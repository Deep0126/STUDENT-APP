import React, { useState } from 'react';
import axios from 'axios';

function StudentManager({ onRegisterSuccess, onGoToLogin }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', course: '', contact: '', idNo: '', dob: '', address: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://student-app-m60q.onrender.com/students', formData);
      onRegisterSuccess(res.data);
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-5">
        <h2 className="mb-4 text-center">Student Registration</h2>
        <div className="d-flex justify-content-center mb-4 gap-2">
          <span className={`badge rounded-pill ${step === 1 ? 'bg-primary' : 'bg-secondary opacity-50'}`}>Step 1</span>
          <span className={`badge rounded-pill ${step === 2 ? 'bg-primary' : 'bg-secondary opacity-50'}`}>Step 2</span>
        </div>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
          {step === 1 ? (
            <div className="row g-4">
              <div className="col-12">
                <label className="form-label small fw-bold">FULL NAME</label>
                <input name="name" className="form-control glass-input" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">EMAIL</label>
                <input name="email" type="email" className="form-control glass-input" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">PASSWORD</label>
                <input name="password" type="password" className="form-control glass-input" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-modern">Next Step ➔</button>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label small fw-bold">COURSE</label>
                <input name="course" className="form-control glass-input" value={formData.course} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">STUDENT ID</label>
                <input name="idNo" className="form-control glass-input" value={formData.idNo} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">PHONE</label>
                <input name="contact" className="form-control glass-input" value={formData.contact} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">DOB</label>
                <input name="dob" type="date" className="form-control glass-input" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">ADDRESS</label>
                <textarea name="address" className="form-control glass-input" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="col-12 d-flex justify-content-between">
                <button type="button" className="btn btn-link text-muted" onClick={handlePrev}>⇦ Back</button>
                <button type="submit" className="btn btn-modern">Complete Registration 🎓</button>
              </div>
            </div>
          )}
        </form>
        <button className="btn btn-link w-100 mt-4 text-muted small" onClick={onGoToLogin}>
          Already registered? Login
        </button>
      </div>
    </div>
  );
}

export default StudentManager;

