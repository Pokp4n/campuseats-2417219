import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import { vendors } from "./data/vendors.js";

function App() {
  const vendor = vendors[0];

  return (
    <>
      <Header />

      <main className="container">
        <section>
          <h2 className="section-title">Today's vendors</h2>
          <VendorCard />
        </section>

        <section>
          <h2 className="section-title">{vendor.name} menu</h2>
          <MenuList items={vendor.items} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
