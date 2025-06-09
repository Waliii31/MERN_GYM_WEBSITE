// App.jsx
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';

const App = () => {
  return (
    <Router> {/* ✅ use the alias you imported */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
