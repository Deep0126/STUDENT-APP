import Navbar from "./components/Navbar";
import StudentManager from "./pages/StudentManager";
import ExamManager from "./pages/ExamManager";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  const [activeStudent, setActiveStudent] = useState(null);
  const [currentView, setCurrentView] = useState("student"); 
  const [studentAuthMode, setStudentAuthMode] = useState("login"); 
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleStudentRegistration = (studentData) => {
    setActiveStudent(studentData);
  };

  const handleStudentLogin = (studentData) => {
    setActiveStudent(studentData);
  };

  const handleLogout = () => {
    setActiveStudent(null);
    setStudentAuthMode("login"); 
  };

  const handleAdminLogin = (token) => {
    setAdminToken(token);
  };

  const handleAdminLogout = () => {

    setAdminToken(null);
  };

  const switchCurrentView = (view) => {
    // Agar view switch ho raha hai, toh puraane sessions clear kar dein
    setAdminToken(null);
    setActiveStudent(null);
    setStudentAuthMode("login");
    
    setCurrentView(view);
  };

  return (
    <div className="app-main-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onLogout={handleLogout} 
        activeStudent={activeStudent}
        currentView={currentView}
        setCurrentView={switchCurrentView}
        adminToken={adminToken}
        onAdminLogout={handleAdminLogout}
      />

      <main className="flex-grow-1">
        {currentView === "student" ? (
          !activeStudent ? (
            <div className="container py-5">
              {studentAuthMode === "register" ? (
                <StudentManager 
                  onRegisterSuccess={handleStudentRegistration} 
                  onGoToLogin={() => setStudentAuthMode("login")}
                />
              ) : (
                <StudentLogin 
                  onLoginSuccess={handleStudentLogin}
                  onGoBack={() => setStudentAuthMode("register")}
                />
              )
            }
            </div>
          ) : (
            <ExamManager activeStudent={activeStudent} onLogout={handleLogout} />
          )
        ) : (
          !adminToken ? (
            <AdminLogin onLoginSuccess={handleAdminLogin} />
          ) : (
            <AdminDashboard token={adminToken} />
          )
        )}
      </main>


    </div>
  );
}

export default App;