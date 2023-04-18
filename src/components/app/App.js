import Head from "../Head/Head";
import NavMenu from "../NavMenu/NavMenu";
import HeroSection from "../heroSection/HeroSection";
import AboutSection from "../aboutSection/AboutSection";
import ServicesSection from "../servicesSection/ServicesSection";
import LocationsSection from "../locationsSection/LocationsSection";
import Footer from "../footer/Footer";
import ProductsSection from "../productsSection/ProductsSection";

import '../../style/styles.scss';

function App() {
  return (
    <div className="App">
      <Head />
      <header className="App-header">
        <NavMenu />
      </header>
      <main className="App-main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <LocationsSection />
      </main>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
