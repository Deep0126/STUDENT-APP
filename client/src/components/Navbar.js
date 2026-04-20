import React from 'react';

function Navbar({ 
  theme, 
  toggleTheme, 
  onLogout, 
  activeStudent, 
  currentView, 
  setCurrentView,
  adminToken,
  onAdminLogout 
}) {
  return (
    <nav className="navbar py-3 sticky-top">
      <div className="container">
        <div className="glass-card w-100 px-4 py-2 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('student')}>
             <span className="portal-icon fs-2">🎓</span>
             <h4 className="m-0 d-none d-md-block">StudentPortal</h4>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div className="nav-links d-flex gap-2 gap-lg-4 me-1 me-md-3">
              <button 
                className={`btn btn-link text-decoration-none transition-all p-0 ${currentView === 'student' ? 'fw-bold border-bottom' : 'text-muted'}`}
                style={{ fontSize: '0.9rem' }}
                onClick={() => setCurrentView('student')}
              >
                Student
              </button>
              <button 
                className={`btn btn-link text-decoration-none transition-all p-0 ${currentView === 'admin' ? 'fw-bold border-bottom' : 'text-muted'}`}
                style={{ fontSize: '0.9rem' }}
                onClick={() => setCurrentView('admin')}
              >
                Admin
              </button>
            </div>

            <button className="btn btn-link theme-toggle p-0" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {activeStudent && currentView === 'student' && (
              <button className="btn btn-modern px-3 py-2" onClick={onLogout}>
                <span className="me-2">🔓</span> Logout
              </button>
            )}

            {adminToken && currentView === 'admin' && (
              <button className="btn btn-modern px-3 py-2" onClick={onAdminLogout}>
                <span className="me-2">🚪</span> Exit Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
