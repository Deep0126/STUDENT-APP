import React, { useState } from 'react';
import axios from 'axios';

function ExamManager({ activeStudent, onLogout }) {
  const [formData, setFormData] = useState({
    name: activeStudent.name,
    enrollNo: activeStudent.idNo,
    contact: activeStudent.contact || '',
    department: '',
    branch: '',
    subject: [],
    feesPaid: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const subjects = ['Mathematics', 'Physics', 'Programming', 'DBM', 'Networking', 'AI'];

  const handleSubjectChange = (subj) => {
    const updated = formData.subject.includes(subj) 
      ? formData.subject.filter(s => s !== subj)
      : [...formData.subject, subj];
    setFormData({ ...formData, subject: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${activeStudent.token}` }
      };
      const res = await axios.post('http://localhost:5000/exams', formData, config);
      setRefId(res.data.referenceId);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed: " + (err.response?.data || "Server Error"));
    }
  };

  if (submitted) {
    return (
      <div className="container py-5">
        <div className="glass-card p-5 text-center max-w-lg mx-auto">
          <div className="fs-1 mb-3">✅</div>
          <h2 className="mb-3">Exam Form Submitted!</h2>
          <p className="text-muted mb-4">Your application is being processed.</p>
          <div className="bg-light p-3 rounded-pill mb-4 border border-primary">
            <span className="fw-bold">Reference ID: {refId}</span>
          </div>
          <button className="btn btn-modern px-5" onClick={onLogout}>Finish & Logout 🚪</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4 justify-content-center">
        <div className="col-lg-8">
          <div className="glass-card p-5">
            <h2 className="mb-4">Examination Form</h2>
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-md-6">
                <label className="form-label small fw-bold">NAME</label>
                <input className="form-control glass-input" value={formData.name} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">ID NO</label>
                <input className="form-control glass-input" value={formData.enrollNo} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">DEPARTMENT</label>
                <input className="form-control glass-input" name="department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">BRANCH</label>
                <input className="form-control glass-input" name="branch" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} required />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold mb-3">SELECT SUBJECTS</label>
                <div className="d-flex flex-wrap gap-2">
                  {subjects.map(subj => (
                    <button 
                      key={subj} 
                      type="button" 
                      className={`btn rounded-pill border py-2 px-4 transition-all ${formData.subject.includes(subj) ? 'btn-primary' : 'bg-transparent text-muted'}`}
                      onClick={() => handleSubjectChange(subj)}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-12">
                <div className="p-3 glass-card rounded-4 border d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-4">💰</span>
                    <span className="fw-bold small text-uppercase tracking-wider">Have you paid the exam fees?</span>
                  </div>
                  <div className="btn-group rounded-pill overflow-hidden border p-1 bg-white/5" role="group" style={{ minWidth: '200px' }}>
                    <button 
                      type="button" 
                      className={`btn rounded-pill border-0 transition-all ${formData.feesPaid ? 'btn-primary shadow-sm' : 'text-muted'}`}
                      onClick={() => setFormData({...formData, feesPaid: true})}
                      style={{ fontWeight: formData.feesPaid ? 'bold' : 'normal' }}
                    >
                      ✅ Yes, Paid
                    </button>
                    <button 
                      type="button" 
                      className={`btn rounded-pill border-0 transition-all ${!formData.feesPaid ? 'btn-danger shadow-sm' : 'text-muted'}`}
                      onClick={() => setFormData({...formData, feesPaid: false})}
                      style={{ fontWeight: !formData.feesPaid ? 'bold' : 'normal' }}
                    >
                      ❌ Not Paid
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-5">
                <button type="submit" className="btn btn-modern px-5 py-3">Submit Exam Form ➔</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamManager;
