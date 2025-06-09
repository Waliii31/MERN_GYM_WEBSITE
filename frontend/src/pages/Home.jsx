import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WorkoutSessions from "../components/WorkoutSessions";
import Gallery from "../components/Gallery";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import BMICalculator from "../components/BMICalculator";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      navigate("/auth"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Hero />
      <WorkoutSessions />
      <Gallery />
      <Pricing />
      <Contact />
      <BMICalculator />
      <Footer />
      <ToastContainer theme="dark" position="top-center" />
    </>
  );
};

export default Home;
