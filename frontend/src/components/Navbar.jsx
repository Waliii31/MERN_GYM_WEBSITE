import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate('/auth'); // 👈 Redirect to auth page
  };

  return (
    <header className="navbar-header">
      <p>ELITE EDGE FITNESS</p>
      <button className="logout-btn" onClick={handleLogout}>
        LOGOUT
      </button>
    </header>
  );
};

export default Navbar;
