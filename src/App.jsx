import './App.css'
import Hero from "./components/Hero/Hero.jsx";
import Services from "./components/Services/Services.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Header from "./components/Header/Header.jsx";
import FinalCTA from "./components/FinalCTA/FinalCTA.jsx";
import { ParallaxProvider } from "react-scroll-parallax";
import Form from "./components/Form/Form.jsx";
import Team from "./components/Team/Team.jsx";

function App() {

  return (
      <ParallaxProvider>
          <>
              <Header/>
              <Hero/>
              <Gallery/>
              <Services/>
              <Team/>
              <Testimonials/>
              <FinalCTA/>
          </>
      </ParallaxProvider>
  )
}

export default App
