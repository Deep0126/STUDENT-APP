import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({ token }) {
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const sRes = await axios.get('http://192.168.1.3:5000/students', config);
      const eRes = await axios.get('http://192.168.1.3:5000/exams', config);
      setStudents(sRes.data);
      setExams(eRes.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  return (
    <div className="container py-5">
      <div className="glass-card mb-5 p-4 d-flex justify-content-between align-items-center">
        <h2 className="m-0 text-primary">Admin Control Center</h2>
        <div className="btn-group">
          <button className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('students')}>Students ({students.length})</button>
          <button className={`btn ${activeTab === 'exams' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('exams')}>Exams ({exams.length})</button>
        </div>
      </div>

      <div className="glass-table-container">
        {activeTab === 'students' ? (
          <table className="glass-table m-0">
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>ID No</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.idNo}</td>
                    <td>{s.contact}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="glass-table m-0">
            <thead>
              <tr>
                <th>Student</th>
                <th>ID</th>
                <th>Ref ID</th>
                <th>Branch</th>
                <th>Subjects</th>
                <th>Fee Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(e => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.enrollNo}</td>
                  <td><span className="small font-mono text-primary fw-bold">{e.referenceId || 'N/A'}</span></td>
                  <td>{e.branch}</td>
                  <td>{e.subject.join(', ')}</td>
                  <td><span className={`badge ${e.feesPaid ? 'bg-success' : 'bg-danger'}`}>{e.feesPaid ? 'Paid' : 'Pending'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
