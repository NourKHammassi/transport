import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { ContactForm } from "../features/contact/ContactForm";
import { DevisForm } from "../features/about/DevisForm";
import { useLocation } from "react-router-dom";

export const DemanderDevis = () => {
  const location = useLocation();
  const selectedProduct = location.state || {}; // Récupérer les données passées

  return (
    <>
      <Navbar isProductList={true} />
      <DevisForm selectedProduct={selectedProduct} />
      <Footer />
    </>
  );
};
