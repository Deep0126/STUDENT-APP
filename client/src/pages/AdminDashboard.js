import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({ token }) {
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const sRes = await axios.get('https://student-app-m60q.onrender.com/students', config);
      const eRes = await axios.get('https://student-app-m60q.onrender.com/exams', config);
      setStudents(sRes.data);
      setExams(eRes.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`https://student-app-m60q.onrender.com/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(students.filter(s => s._id !== id));
      } catch (err) {
        console.log("Error deleting student", err);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  const handleDeleteExam = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam record?")) {
      try {
        await axios.delete(`https://student-app-m60q.onrender.com/exams/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExams(exams.filter(e => e._id !== id));
      } catch (err) {
        console.log("Error deleting exam", err);
        alert("Failed to delete exam. Please try again.");
      }
    }
  };

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (activeTab === 'students') {
      csvContent += "Name,Course,ID No,Contact\n";
      filteredStudents.forEach(s => {
        csvContent += `${s.name},${s.course},${s.idNo},${s.contact}\n`;
      });
    } else {
      csvContent += "Student,ID,Ref ID,Branch,Subjects,Fee Status\n";
      filteredExams.forEach(e => {
        const subjects = e.subject ? e.subject.join(';') : '';
        csvContent += `${e.name},${e.enrollNo},${e.referenceId},${e.branch},${subjects},${e.feesPaid ? 'Paid' : 'Pending'}\n`;
      });
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Derived state for filtering
  const filteredStudents = students.filter(s => 
    (s.name && s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (s.idNo && s.idNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (s.course && s.course.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredExams = exams.filter(e => 
    (e.name && e.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (e.enrollNo && e.enrollNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (e.branch && e.branch.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentData = activeTab === 'students' ? filteredStudents : filteredExams;

  const pendingFeesCount = exams.filter(e => !e.feesPaid).length;

  return (
    <div className="container py-5">
      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="glass-card p-3 text-center border-start border-primary border-4 h-100 d-flex flex-column justify-content-center">
            <h5 className="text-muted mb-1">Total Students</h5>
            <h2 className="text-primary mb-0">{students.length}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="glass-card p-3 text-center border-start border-success border-4 h-100 d-flex flex-column justify-content-center">
            <h5 className="text-muted mb-1">Total Exams</h5>
            <h2 className="text-success mb-0">{exams.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card p-3 text-center border-start border-danger border-4 h-100 d-flex flex-column justify-content-center">
            <h5 className="text-muted mb-1">Pending Fees</h5>
            <h2 className="text-danger mb-0">{pendingFeesCount}</h2>
          </div>
        </div>
      </div>

      {/* Header and Controls */}
      <div className="glass-card mb-4 p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
          <h2 className="m-0 text-primary mb-3 mb-md-0">Admin Control Center</h2>
          <div className="btn-group">
            <button className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('students')}>Students</button>
            <button className={`btn ${activeTab === 'exams' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveTab('exams')}>Exams</button>
          </div>
        </div>
        
        <div className="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
          <div className="flex-grow-1" style={{ maxWidth: '400px' }}>
            <input 
              type="text" 
              className="form-control glass-input" 
              placeholder={`Search ${activeTab}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={exportToCSV}>
            📥 Export to CSV
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-table-container mb-3">
        {activeTab === 'students' ? (
          <table className="glass-table m-0">
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>ID No</th>
                  <th>Contact</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map(s => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.idNo}</td>
                    <td>{s.contact}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteStudent(s._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-muted py-3">No students found.</td></tr>
                )}
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
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(e => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.enrollNo}</td>
                  <td><span className="small font-mono text-primary fw-bold">{e.referenceId || 'N/A'}</span></td>
                  <td>{e.branch}</td>
                  <td>{e.subject ? e.subject.join(', ') : ''}</td>
                  <td><span className={`badge ${e.feesPaid ? 'bg-success' : 'bg-danger'}`}>{e.feesPaid ? 'Paid' : 'Pending'}</span></td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteExam(e._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr><td colSpan="7" className="text-center text-muted py-3">No exams found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;